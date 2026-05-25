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
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f4f8; margin: 0; padding: 0; }
            .wrapper { max-width: 580px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 40px rgba(0,0,0,0.10); }
            .header { background: linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%); padding: 40px 40px 32px; text-align: center; }
            .header h1 { color: white; font-size: 1.6rem; margin: 0 0 6px; font-family: Georgia, serif; }
            .header p { color: rgba(255,255,255,0.65); font-size: 0.9rem; margin: 0; }
            .body { padding: 40px; }
            .body p { color: #374151; font-size: 0.95rem; line-height: 1.75; margin: 0 0 16px; }
            .ref-box { background: #eff6ff; border: 1.5px solid #dbeafe; border-radius: 10px; padding: 18px 22px; text-align: center; margin: 24px 0; }
            .ref-box p { margin: 0 0 4px; font-size: 0.82rem; color: #6b7280; }
            .ref-box strong { font-size: 1.4rem; color: #1d5fdb; font-family: monospace; letter-spacing: 0.05em; }
            .detail-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .detail-table td { padding: 11px 14px; font-size: 0.88rem; border-bottom: 1px solid #f3f4f6; }
            .detail-table td:first-child { color: #6b7280; width: 140px; }
            .detail-table td:last-child { color: #111827; font-weight: 600; }
            .cta { display: block; background: #1d5fdb; color: white; text-decoration: none; text-align: center; padding: 15px 32px; border-radius: 10px; font-weight: 700; font-size: 0.97rem; margin: 28px 0 0; }
            .footer-note { background: #f9fafb; padding: 28px 40px; text-align: center; }
            .footer-note p { color: #9ca3af; font-size: 0.8rem; margin: 0; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <h1>✉ Application Confirmed</h1>
              <p>JobApplyPro — Professional Email Reply Service</p>
            </div>
            <div class="body">
              <p>Dear <strong>${fullName}</strong>,</p>
              <p>
                We have successfully received your job application and your payment of <strong>$20</strong> has been confirmed. Our professional writing team will now craft your tailored email reply.
              </p>
              <div class="ref-box">
                <p>Your Application Reference</p>
                <strong>${application.reference}</strong>
              </div>
              <table class="detail-table">
                <tr><td>Applicant</td><td>${fullName}</td></tr>
                <tr><td>Job Title</td><td>${application.jobTitle}</td></tr>
                <tr><td>Company</td><td>${application.companyName}</td></tr>
                <tr><td>Submitted</td><td>${new Date(application.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td></tr>
                <tr><td>Payment</td><td>$20.00 — ✓ Confirmed</td></tr>
                <tr><td>Expected Delivery</td><td>Within 24 hours</td></tr>
              </table>
              <p>
                Your professionally written email reply will be delivered to <strong>${application.email}</strong> within <strong>24 hours</strong>. Please check your inbox and spam/junk folder.
              </p>
              <p>
                To track your application status at any time, visit our status page and enter your reference number above.
              </p>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://jobapplypro.vercel.app'}/status" class="cta">Track My Application →</a>
            </div>
            <div class="footer-note">
              <p>If you have any questions, reply to this email or contact <a href="mailto:support@jobapplypro.com" style="color:#1d5fdb;">support@jobapplypro.com</a></p>
              <p style="margin-top:8px;">© ${new Date().getFullYear()} JobApplyPro. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
  } catch (err) {
    console.error('Failed to send applicant confirmation email:', err.message);
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
      subject: `🆕 New Paid Application: ${application.firstName} ${application.lastName} — ${application.jobTitle} at ${application.companyName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8"/>
          <style>
            body { font-family: Arial, sans-serif; background: #f0f4f8; margin: 0; padding: 20px; }
            .card { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
            .card-header { background: #0a1628; color: white; padding: 28px 32px; }
            .card-header h2 { margin: 0; font-size: 1.3rem; }
            .card-header p { margin: 4px 0 0; opacity: 0.65; font-size: 0.85rem; }
            .card-body { padding: 28px 32px; }
            table { width: 100%; border-collapse: collapse; }
            td { padding: 10px 12px; border-bottom: 1px solid #f3f4f6; font-size: 0.9rem; }
            td:first-child { color: #6b7280; width: 170px; font-weight: 600; }
            td:last-child { color: #111827; }
            .section-label { background: #eff6ff; padding: 8px 12px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #1d5fdb; border-radius: 6px; margin: 20px 0 10px; }
            .cover-note { background: #f9fafb; border-left: 3px solid #1d5fdb; padding: 14px 16px; border-radius: 0 8px 8px 0; font-size: 0.88rem; color: #374151; line-height: 1.7; margin-top: 8px; white-space: pre-line; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="card-header">
              <h2>🆕 New Paid Application</h2>
              <p>Ref: ${application.reference} — Payment Confirmed — Needs Email Writing</p>
            </div>
            <div class="card-body">
              <div class="section-label">Personal Details</div>
              <table>
                <tr><td>Name</td><td>${application.firstName} ${application.lastName}</td></tr>
                <tr><td>Email</td><td>${application.email}</td></tr>
                <tr><td>Phone</td><td>${application.phone}</td></tr>
              </table>

              <div class="section-label">Job Details</div>
              <table>
                <tr><td>Job Title</td><td>${application.jobTitle}</td></tr>
                <tr><td>Company</td><td>${application.companyName}</td></tr>
                <tr><td>Job Found Via</td><td>${application.jobSource || 'Not specified'}</td></tr>
                <tr><td>Experience</td><td>${application.yearsExperience || 'Not specified'}</td></tr>
                <tr><td>Current Role</td><td>${application.currentRole || 'Not specified'}</td></tr>
                <tr><td>LinkedIn</td><td>${application.linkedinUrl || 'Not provided'}</td></tr>
              </table>

              <div class="section-label">Skills</div>
              <div class="cover-note">${application.keySkills}</div>

              <div class="section-label">Professional Summary</div>
              <div class="cover-note">${application.coverNote}</div>

              <div class="section-label">Meta</div>
              <table>
                <tr><td>Reference</td><td>${application.reference}</td></tr>
                <tr><td>Submitted At</td><td>${new Date(application.submittedAt).toLocaleString()}</td></tr>
                <tr><td>Heard About Us</td><td>${application.heardAbout || 'Not specified'}</td></tr>
              </table>
            </div>
          </div>
        </body>
        </html>
      `,
    });
  } catch (err) {
    console.error('Failed to send admin notification email:', err.message);
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

    // Verify with Paystack API
    const paystackResponse = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const paystackData = await paystackResponse.json();

    if (!paystackData.status || paystackData.data?.status !== 'success') {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed. Please contact support.',
      });
    }

    // Find and update application
    const application = applicationsStore.get(reference);
    if (!application) {
      // Even if not found in memory (cold start), still return success if Paystack confirms
      return res.status(200).json({ success: true, message: 'Payment verified. Application processing.' });
    }

    // Update application status
    application.status = 'paid';
    application.paymentStatus = 'success';
    application.paystackReference = paystackData.data.reference;
    application.updatedAt = new Date().toISOString();
    applicationsStore.set(reference, application);

    // Send emails (non-blocking)
    sendApplicantConfirmationEmail(application);
    sendAdminNotificationEmail(application);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Payment verification error:', err);
    return res.status(500).json({ message: 'Verification failed. Please contact support.' });
  }
}
