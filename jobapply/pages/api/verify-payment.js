import { applicationsStore } from './register-application';
import nodemailer from 'nodemailer';

async function sendApplicantConfirmationEmail(application) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const fullName = `${application.firstName} ${application.lastName}`;

    await transporter.sendMail({
      from: `"JobApplyPro" <${process.env.EMAIL_USER}>`,
      to: application.email,
      subject: `✅ Application Received — Ref: ${application.reference}`,
      html: `...same HTML as yours...`,
    });
  } catch (err) {
    console.error('Email error (user):', err.message);
  }
}

async function sendAdminNotificationEmail(application) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"JobApplyPro Notifications" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `🆕 Paid Application: ${application.firstName} ${application.lastName}`,
      html: `...same HTML as yours...`,
    });
  } catch (err) {
    console.error('Email error (admin):', err.message);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { reference } = req.body;

    if (!reference) {
      return res.status(400).json({ message: 'Reference is required' });
    }

    // 🔐 Verify with Paystack
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paystackData = await paystackResponse.json();

    // ✅ STRICT validation (FIXED)
 if (
  !paystackData ||
  paystackData.status !== true ||
  paystackData.data?.status !== 'success'
) {
      return res.status(400).json({
        success: false,
        message: 'Payment not successful',
      });
    }

    const application = applicationsStore.get(reference);

    // ❌ DO NOT silently approve unknown payments
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found for this payment reference',
      });
    }

    // ❌ prevent duplicate processing
    if (application.paymentStatus === 'success') {
      return res.status(200).json({
        success: true,
        message: 'Already processed',
      });
    }

    // ✅ update application
    application.status = 'paid';
    application.paymentStatus = 'success';
    application.paystackReference = paystackData.data.reference;
    application.updatedAt = new Date().toISOString();

    applicationsStore.set(reference, application);

    // 🚀 non-blocking but safe execution
    await Promise.allSettled([
      sendApplicantConfirmationEmail(application),
      sendAdminNotificationEmail(application),
    ]);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Verification error:', err);

    return res.status(500).json({
      success: false,
      message: 'Server error during verification',
    });
  }
}