import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Custom404() {
  return (
    <>
      <Head><title>Page Not Found — JobApplyPro</title></Head>
      <Navbar />
      <main style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 2rem',
        background: 'var(--gray-100)',
        textAlign: 'center',
      }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '8rem', fontWeight: 900, color: 'var(--blue-pale)', lineHeight: 1, marginBottom: 16 }}>404</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: 'var(--blue-deep)', marginBottom: 16 }}>Page Not Found</h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '1rem', maxWidth: 400, margin: '0 auto 40px', lineHeight: 1.7 }}>
            The page you are looking for does not exist or has been moved.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{
              background: 'var(--blue-brand)',
              color: 'white',
              padding: '13px 28px',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: '0.95rem',
            }}>← Go Home</Link>
            <Link href="/apply" style={{
              background: 'white',
              color: 'var(--blue-deep)',
              padding: '13px 28px',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: '0.95rem',
              border: '1.5px solid var(--gray-200)',
            }}>Apply Now</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
