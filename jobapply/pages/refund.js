import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Refund() {
  return (
    <>
      <Head><title>Refund Policy — JobApplyPro</title></Head>
      <Navbar />
      <main style={{ background: 'var(--gray-100)', minHeight: '100vh', padding: '60px 2rem' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', background: 'white', borderRadius: 'var(--radius-lg)', padding: '52px 48px', boxShadow: 'var(--shadow-lg)' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', color: 'var(--blue-deep)', marginBottom: 8 }}>Refund Policy</h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.88rem', marginBottom: 36 }}>Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p style={{ color: 'var(--gray-700)', fontSize: '0.92rem', lineHeight: 1.75, marginBottom: 20 }}>
            At JobApplyPro, we are committed to delivering high-quality professional email replies. Please read our refund policy carefully before making a payment.
          </p>
          {[
            ['Non-Refundable After Delivery', 'The $20 registration fee is non-refundable once your professionally written email reply has been delivered to your registered email address.'],
            ['Grounds for Refund', 'You may be eligible for a full refund if: (1) Your email reply was not delivered within 48 hours of payment confirmation, or (2) The delivered email contains significant errors clearly resulting from our mistake (not from inaccurate information provided by you).'],
            ['How to Request a Refund', 'To request a refund, contact us at support@jobapplypro.com within 7 days of payment, including your reference number and reason for the request. We will respond within 2 business days.'],
            ['Processing Time', 'Approved refunds will be processed back to your original payment method within 5–10 business days, depending on your bank or card issuer.'],
          ].map(([title, content]) => (
            <div key={title} style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', color: 'var(--blue-deep)', marginBottom: 10 }}>{title}</h2>
              <p style={{ color: 'var(--gray-700)', fontSize: '0.92rem', lineHeight: 1.75 }}>{content}</p>
            </div>
          ))}
          <div style={{ marginTop: 40, background: 'var(--blue-subtle)', border: '1.5px solid var(--blue-pale)', borderRadius: 'var(--radius)', padding: '20px 24px' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--blue-mid)', margin: 0 }}>
              Questions about a refund? Email us at <a href="mailto:support@jobapplypro.com" style={{ color: 'var(--blue-brand)', fontWeight: 700 }}>support@jobapplypro.com</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
