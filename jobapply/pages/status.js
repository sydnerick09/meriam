import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Status() {
  const [ref, setRef] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  async function handleCheck(e) {
    e.preventDefault();
    setError('');
    setResult(null);
    if (!ref.trim() || !email.trim()) {
      setError('Please enter both your reference number and email address.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/check-status?ref=${encodeURIComponent(ref.trim())}&email=${encodeURIComponent(email.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Application not found. Please check your reference number and email.');
      } else {
        setResult(data);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const STATUS_LABELS = {
    pending: { label: 'Payment Pending', cls: 'status-pending' },
    paid: { label: 'Payment Confirmed', cls: 'status-reviewing' },
    reviewing: { label: 'Under Review', cls: 'status-reviewing' },
    writing: { label: 'Email Being Written', cls: 'status-reviewing' },
    delivered: { label: 'Email Delivered', cls: 'status-approved' },
    cancelled: { label: 'Cancelled', cls: 'status-rejected' },
  };

  const statusInfo = result ? (STATUS_LABELS[result.status] || { label: result.status, cls: 'status-pending' }) : null;

  return (
    <>
      <Head>
        <title>Track Application — JobApplyPro</title>
        <meta name="description" content="Track the status of your job application email reply using your reference number." />
      </Head>

      <Navbar />

      <main className="status-page">
        <div className="status-card">
          <h1>Track Your Application</h1>
          <p>Enter your reference number and email address to check the current status of your application.</p>

          {error && (
            <div className="alert alert-error">
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleCheck} noValidate style={{ marginBottom: 32 }}>
            <div className="form-group">
              <label htmlFor="ref-input">Reference Number <span style={{ color: '#e53e3e' }}>*</span></label>
              <input
                id="ref-input"
                type="text"
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                placeholder="e.g. JAP-1234567890"
                style={{ width: '100%', padding: '13px 16px', border: '1.5px solid var(--gray-200)', borderRadius: 8, fontSize: '0.93rem', background: 'var(--gray-100)', transition: 'all 0.25s ease' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--blue-brand)'; e.target.style.background = 'white'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--gray-200)'; e.target.style.background = 'var(--gray-100)'; }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email-input">Email Address <span style={{ color: '#e53e3e' }}>*</span></label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="The email you used to apply"
                style={{ width: '100%', padding: '13px 16px', border: '1.5px solid var(--gray-200)', borderRadius: 8, fontSize: '0.93rem', background: 'var(--gray-100)', transition: 'all 0.25s ease' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--blue-brand)'; e.target.style.background = 'white'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--gray-200)'; e.target.style.background = 'var(--gray-100)'; }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: 'var(--blue-brand)',
                color: 'white',
                padding: '14px 24px',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: '0.97rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                border: 'none',
                transition: 'all 0.25s ease',
              }}
            >
              {loading ? <><span className="spinner" /> Checking...</> : '🔍 Check Status'}
            </button>
          </form>

          {result && statusInfo && (
            <div style={{ borderTop: '1.5px solid var(--gray-200)', paddingTop: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: 'var(--blue-deep)' }}>
                  Application Found
                </h3>
                <span className={`status-badge ${statusInfo.cls}`}>
                  {statusInfo.label}
                </span>
              </div>

              <div>
                {[
                  ['Applicant Name', `${result.firstName} ${result.lastName}`],
                  ['Job Title', result.jobTitle],
                  ['Company', result.companyName],
                  ['Reference', result.reference],
                  ['Submitted', result.submittedAt ? new Date(result.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'],
                  ['Payment Status', result.paymentStatus === 'success' ? '✓ Paid' : 'Pending'],
                ].map(([label, value]) => (
                  <div className="status-detail-row" key={label}>
                    <span className="status-detail-label">{label}</span>
                    <span className="status-detail-value">{value}</span>
                  </div>
                ))}
              </div>

              {result.status === 'delivered' && (
                <div className="alert alert-success" style={{ marginTop: 20, marginBottom: 0 }}>
                  <span>✓</span>
                  <span>Your email reply has been delivered to <strong>{result.email}</strong>. Please check your inbox (and spam folder).</span>
                </div>
              )}

              {(result.status === 'paid' || result.status === 'reviewing' || result.status === 'writing') && (
                <div className="alert" style={{ marginTop: 20, marginBottom: 0, background: 'var(--blue-subtle)', border: '1px solid var(--blue-pale)', color: 'var(--blue-mid)' }}>
                  <span>⏳</span>
                  <span>Your application is being processed. Your email reply will be delivered to <strong>{result.email}</strong> within 24 hours.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
