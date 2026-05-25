import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service — JobApplyPro</title>
      </Head>
      <Navbar />
      <main style={{ background: 'var(--gray-100)', minHeight: '100vh', padding: '60px 2rem' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', background: 'white', borderRadius: 'var(--radius-lg)', padding: '52px 48px', boxShadow: 'var(--shadow-lg)' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', color: 'var(--blue-deep)', marginBottom: 8 }}>Terms of Service</h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.88rem', marginBottom: 36 }}>Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

          {[
            ['1. Acceptance of Terms', 'By accessing and using JobApplyPro, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.'],
            ['2. Service Description', 'JobApplyPro provides professional email reply writing services for job applications. Upon payment of the $20 registration fee, we will craft a tailored, professional email reply and deliver it to your registered email address within 24 hours.'],
            ['3. Payment', 'The registration fee is $20 USD per application, processed securely via Paystack. Payment must be completed before your application is processed. We accept all payment methods supported by Paystack.'],
            ['4. Refund Policy', 'The $20 registration fee is non-refundable once your email reply has been delivered to your inbox. If we fail to deliver within 48 hours or make a significant error in the content, please contact our support team for a resolution or refund.'],
            ['5. Delivery', 'We aim to deliver your professionally written email reply within 24 hours of payment confirmation. Delivery is made to the email address provided at the time of application.'],
            ['6. Intellectual Property', 'The email reply we create for you is yours to use for your job application. We retain no rights over the delivered content once payment is confirmed.'],
            ['7. Accuracy of Information', 'You are responsible for providing accurate and truthful information in your application form. We are not liable for any inaccuracies in the final email resulting from incorrect information provided by you.'],
            ['8. Limitation of Liability', 'JobApplyPro is not responsible for the outcomes of your job applications. We provide a professional email writing service only and do not guarantee job interviews or employment.'],
            ['9. Privacy', 'Your personal information is handled in accordance with our Privacy Policy. We do not sell or share your data with third parties except as required to deliver our service.'],
            ['10. Contact', 'For questions about these terms, contact us at legal@jobapplypro.com'],
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
