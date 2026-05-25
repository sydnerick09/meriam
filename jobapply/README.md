# JobApplyPro — Professional Job Application Email Reply Service

A full-stack Next.js web application that allows job seekers to submit their details, pay a **$20 USD registration fee via Paystack**, and receive a professionally written, tailored email reply for their job application — delivered to their inbox within 24 hours.

---

## 🚀 Features

- **Homepage** — Professional landing page with hero section, how-it-works, features, testimonials, pricing, and FAQ
- **Application Form** — Detailed form capturing applicant details, job info, skills, and professional summary
- **Paystack Integration** — Secure $20 USD payment with real-time verification
- **Email Notifications** — Applicant confirmation email + Admin notification with full application details
- **Application Tracking** — Status check page using reference number + email
- **Legal Pages** — Terms of Service, Privacy Policy, Refund Policy
- **Contact Page** — Support contact form
- **Fully Responsive** — Works on mobile, tablet, and desktop
- **Vercel Ready** — Optimised for one-click Vercel deployment

---

## 🎨 Design

- **Colors**: White, Blue (#1d5fdb), Black — as specified
- **Fonts**: Playfair Display (headings) + DM Sans (body)
- **Style**: Clean, professional, corporate — inspired by top-tier SaaS products

---

## 📁 Project Structure

```
jobapply/
├── pages/
│   ├── index.js          # Homepage
│   ├── apply.js          # Application form with Paystack
│   ├── success.js        # Post-payment success page
│   ├── status.js         # Application status tracking
│   ├── terms.js          # Terms of Service
│   ├── privacy.js        # Privacy Policy
│   ├── refund.js         # Refund Policy
│   ├── contact.js        # Contact page
│   ├── 404.js            # Custom 404 page
│   ├── _app.js           # App wrapper
│   ├── _document.js      # HTML document
│   └── api/
│       ├── register-application.js  # Save application, generate ref
│       ├── verify-payment.js        # Verify Paystack payment + send emails
│       ├── check-status.js          # Check application status
│       └── webhook.js               # Paystack webhook handler
├── components/
│   ├── Navbar.js         # Navigation bar
│   └── Footer.js         # Footer
├── styles/
│   └── globals.css       # All CSS styles
├── public/
│   └── favicon.svg
├── .env.example          # Environment variables template
├── next.config.js
├── vercel.json
└── package.json
```

---

## ⚙️ Setup & Deployment

### 1. Prerequisites

- Node.js 18+
- A [Paystack](https://paystack.com) account
- A Gmail account (for email notifications)

### 2. Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your actual values (see below)
nano .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Environment Variables

Edit `.env.local` with the following:

| Variable | Description | Where to Get It |
|---|---|---|
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack public key | [Paystack Dashboard → Developers](https://dashboard.paystack.com/#/settings/developers) |
| `PAYSTACK_SECRET_KEY` | Paystack secret key | Same as above |
| `EMAIL_USER` | Gmail address for sending emails | Your Gmail |
| `EMAIL_PASS` | Gmail App Password | [Google App Passwords](https://myaccount.google.com/apppasswords) |
| `ADMIN_EMAIL` | Where to receive new application alerts | Your admin email |
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL | e.g. `https://jobapplypro.vercel.app` |

> **Gmail Setup**: If using Gmail with 2-Factor Authentication, you must create an App Password. Go to Google Account → Security → App Passwords → Generate a new one for "Mail".

### 4. Deploy to Vercel

**Option A: One-Click via Vercel CLI**
```bash
npm install -g vercel
vercel
```

**Option B: GitHub + Vercel Dashboard**
1. Push code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repository
4. Add all environment variables in **Settings → Environment Variables**
5. Deploy

### 5. Set Up Paystack Webhook (Recommended)

In your [Paystack Dashboard](https://dashboard.paystack.com/#/settings/developer):
1. Go to Settings → API Keys & Webhooks
2. Add webhook URL: `https://your-domain.vercel.app/api/webhook`
3. This ensures payment confirmation even if user closes the browser

---

## 💳 Payment Flow

1. User fills application form
2. Form submits to `/api/register-application` → generates unique reference (e.g. `JAP-1A2B3C4D5E`)
3. Paystack popup opens with reference
4. User completes $20 payment
5. Paystack calls `callback` → app calls `/api/verify-payment`
6. Payment verified → emails sent:
   - **Applicant**: Confirmation email with reference and 24hr delivery notice
   - **Admin**: Full application details notification for email writing
7. User redirected to `/success?ref=JAP-...`

---

## 📧 Email System

Uses **Nodemailer with Gmail SMTP**. Two emails are sent on successful payment:

1. **Applicant Confirmation** — Professional HTML email with application details and reference number
2. **Admin Notification** — Full application details for the writing team to craft the reply

---

## 🔒 Security

- Paystack webhook signature verification using HMAC SHA-512
- Server-side payment verification (never trust client)
- Server-side form validation
- No sensitive data stored in localStorage/cookies

---

## ⚠️ Important Notes

- **No Database**: This app uses an in-memory store (`global._jobApplications`). Data persists only while the Vercel serverless function instance is warm. For production at scale, integrate a database like **Supabase**, **PlanetScale**, or **MongoDB Atlas** by replacing the `applicationsStore` Map with database calls in the API routes.
- **Paystack Currency**: Paystack defaults USD payments to USD. Verify your Paystack account supports USD if needed; otherwise change `currency` to `'NGN'` and `amount` to `200000` (₦200,000 equivalent) in `apply.js`.

---

## 📄 License

MIT — Free to use and modify for your own projects.
