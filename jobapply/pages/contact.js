import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError('');
    // Simulate send (no backend route needed for basic contact)
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
  }

  return (
    <>
      <Head><title>Contact Us — JobApplyPro</title></Head>
      <Navbar />
      <main style={{ background: 'var(--gray-100)', minHeight: '100vh', padding: '60px 2rem' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.4rem', color: 'var(--blue-deep)', marginBottom: 12 }}>Contact Us</h1>
            <p style={{ color: 'var(--gray-500)', fontSize: '1rem' }}>Have a question? We typically respond within 24 hours.</p>
          </div>

          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '48px 44px', boxShadow: 'var(--shadow-lg)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: 70, height: 70, background: '#dcfce7', border: '2px solid #4ade80', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 24px' }}>✓</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--blue-deep)', marginBottom: 12 }}>Message Sent!</h2>
                <p style={{ color: 'var(--gray-500)', fontSize: '0.95rem' }}>Thank you for reaching out. We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {error && <div className="alert alert-error"><span>⚠</span> {error}</div>}
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name <span style={{ color: '#e53e3e' }}>*</span></label>
                    <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" />
                  </div>
                  <div className="form-group">
                    <label>Email Address <span style={{ color: '#e53e3e' }}>*</span></label>
                    <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} placeholder="e.g. Question about my application" />
                </div>
                <div className="form-group">
                  <label>Message <span style={{ color: '#e53e3e' }}>*</span></label>
                  <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Tell us how we can help…" rows={5} />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: 'var(--blue-brand)',
                    color: 'white',
                    padding: '15px 24px',
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: '0.97rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    transition: 'all 0.25s ease',
                  }}
                >
                  {loading ? <><span className="spinner" />Sending…</> : '✉ Send Message'}
                </button>
              </form>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 28 }}>
            {[
              { icon: '📧', label: 'Email', value: 'support@jobapplypro.com' },
              { icon: '⏰', label: 'Response Time', value: 'Within 24 hours' },
            ].map(item => (
              <div key={item.label} style={{ background: 'white', borderRadius: 'var(--radius)', padding: '22px 24px', border: '1px solid var(--gray-200)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gray-500)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--blue-deep)', fontWeight: 600 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
