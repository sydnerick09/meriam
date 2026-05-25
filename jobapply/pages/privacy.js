import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — JobApplyPro</title>
      </Head>
      <Navbar />
      <main style={{ background: 'var(--gray-100)', minHeight: '100vh', padding: '60px 2rem' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', background: 'white', borderRadius: 'var(--radius-lg)', padding: '52px 48px', boxShadow: 'var(--shadow-lg)' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', color: 'var(--blue-deep)', marginBottom: 8 }}>Privacy Policy</h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.88rem', marginBottom: 36 }}>Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

          {[
            ['Information We Collect', 'We collect information you provide directly to us when submitting a job application, including your name, email address, phone number, job title, company name, professional skills, and career summary. We also collect payment confirmation data via Paystack.'],
            ['How We Use Your Information', 'We use your information solely to deliver our professional email writing service. This includes writing and sending your tailored email reply, communicating with you about your application status, and providing customer support.'],
            ['Payment Processing', 'All payments are processed by Paystack, a secure third-party payment provider. We do not store your card details or financial information on our servers.'],
            ['Data Retention', 'We retain your application information for up to 90 days after delivery of your email reply, after which it is securely deleted. You may request deletion of your data at any time by contacting us.'],
            ['Data Sharing', 'We do not sell, rent, or share your personal information with third parties for marketing purposes. We may share data with service providers strictly needed to operate our service (e.g., email delivery services).'],
            ['Security', 'We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, loss, or misuse.'],
            ['Your Rights', 'You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at privacy@jobapplypro.com.'],
            ['Cookies', 'Our website may use essential cookies to ensure proper functionality. We do not use tracking or advertising cookies.'],
            ['Contact', 'For privacy-related questions or requests, please contact privacy@jobapplypro.com.'],
          ].map(([title, content]) => (
            <div key={title} style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', color: 'var(--blue-deep)', marginBottom: 10 }}>{title}</h2>
              <p style={{ color: 'var(--gray-700)', fontSize: '0.92rem', lineHeight: 1.75 }}>{content}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
