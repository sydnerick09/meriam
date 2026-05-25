import crypto from 'crypto';
import { applicationsStore } from './register-application';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['x-paystack-signature'];
    const secret = process.env.PAYSTACK_SECRET_KEY;

    // Verify webhook signature
    const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');

    if (hash !== signature) {
      console.warn('Invalid Paystack webhook signature');
      return res.status(400).json({ message: 'Invalid signature' });
    }

    const event = JSON.parse(rawBody.toString());

    if (event.event === 'charge.success') {
      const data = event.data;
      const reference = data.reference;

      const application = applicationsStore.get(reference);
      if (application && application.paymentStatus !== 'success') {
        application.status = 'paid';
        application.paymentStatus = 'success';
        application.updatedAt = new Date().toISOString();
        applicationsStore.set(reference, application);
        console.log(`Webhook: Payment confirmed for ${reference}`);
      }
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ message: 'Webhook processing failed' });
  }
}
