import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Success() {
  const router = useRouter();
  const { ref } = router.query;

  return (
    <>
      <Head>
        <title>Application Submitted — JobApplyPro</title>
        <meta name="description" content="Your job application has been successfully submitted and paid for. Expect your email reply within 24 hours." />
      </Head>

      <Navbar />

      <main className="success-page">
        <div className="success-card">
          <div className="success-icon-circle">✓</div>

          <h1>Application Submitted!</h1>
          <p>
            Congratulations! Your job application has been received and your payment of <strong>$20</strong> has been verified successfully.
          </p>
          <p>
            Our professional writers are now working on your tailored email reply. You will receive it in your inbox within <strong>24 hours</strong>.
          </p>

          {ref && (
            <div className="success-ref">
              Your Reference: <span>{ref}</span>
            </div>
          )}

          <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: 32 }}>
            Save your reference number above. You can use it on our{' '}
            <Link href="/status" style={{ color: 'var(--blue-brand)', fontWeight: 600 }}>Track Application</Link>
            {' '}page to check the status of your application at any time.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/status" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: 'var(--blue-brand)',
              color: 'white',
              padding: '14px 28px',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: '0.95rem',
              transition: 'all 0.25s ease',
            }}>
              📍 Track My Application
            </Link>
            <Link href="/" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: 'white',
              color: 'var(--blue-deep)',
              padding: '14px 28px',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: '0.95rem',
              border: '1.5px solid var(--gray-200)',
              transition: 'all 0.25s ease',
            }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
