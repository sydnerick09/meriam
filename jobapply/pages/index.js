import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FEATURES = [
  {
    icon: '🎯',
    title: 'Tailored to the Job',
    desc: 'Every email reply is crafted specifically for the job description and company you are targeting, ensuring maximum relevance and impact.',
  },
  {
    icon: '⚡',
    title: 'Fast Turnaround',
    desc: 'Receive your professionally written email reply within 24 hours of payment confirmation. No long waits.',
  },
  {
    icon: '✍️',
    title: 'Expert HR Writing',
    desc: 'Written by professionals who understand what hiring managers look for. Your reply will stand out.',
  },
  {
    icon: '🔒',
    title: 'Secure Payment',
    desc: 'Your $20 registration is processed securely via Paystack — trusted by thousands of businesses across Africa and beyond.',
  },
  {
    icon: '📬',
    title: 'Delivered to Your Inbox',
    desc: 'The finalized professional email is delivered directly to your registered email address, ready to send to the employer.',
  },
  {
    icon: '📋',
    title: 'Application Tracking',
    desc: 'Use your unique reference number to track the status of your application at any time from our status page.',
  },
];

const FAQS = [
  {
    q: 'What exactly do I get for $20?',
    a: 'You get a professionally written, personalized email reply tailored to the specific job you are applying for. This includes a compelling subject line, an engaging opening, highlights of your qualifications, and a strong call-to-action closing — all delivered to your email inbox within 24 hours.',
  },
  {
    q: 'How do I receive my email reply?',
    a: 'After successful payment verification, our team reviews your application details and crafts a tailored email reply. We send it directly to the email address you provided on the application form, usually within 24 hours.',
  },
  {
    q: 'Is the $20 fee refundable?',
    a: 'The fee is non-refundable once the email reply has been delivered. If there is a delay beyond 48 hours or a significant error in the delivered email, please contact our support team to resolve the issue.',
  },
  {
    q: 'Can I apply for multiple jobs?',
    a: 'Each $20 payment covers one job application email reply. For multiple positions, you simply submit a new application for each job.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We use Paystack, which supports credit/debit cards (Visa, Mastercard), bank transfers, USSD, and mobile money depending on your region.',
  },
  {
    q: 'How do I track my application?',
    a: 'After submitting your application, you will receive a unique reference number. Visit our "Track Application" page and enter your reference number and email to see the current status of your application.',
  },
];

const TESTIMONIALS = [
  {
    text: 'I was struggling to write a professional response to my dream job interview invite. JobApplyPro delivered an excellent, polished email that I sent immediately. I got the interview!',
    name: 'Amara Osei',
    role: 'Marketing Analyst, Accra',
    initials: 'AO',
    bg: '#1d5fdb',
  },
  {
    text: 'The turnaround was incredibly fast. Within 12 hours I had a beautifully written email ready. Worth every penny of the $20.',
    name: 'Chidi Nwachukwu',
    role: 'Software Engineer, Lagos',
    initials: 'CN',
    bg: '#0a1628',
  },
  {
    text: 'Professional service. My email reply was tailored perfectly to the company culture and role. I felt confident sending it. Highly recommend.',
    name: 'Fatima Al-Hassan',
    role: 'Finance Graduate, Nairobi',
    initials: 'FA',
    bg: '#1a3a6b',
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Head>
        <title>JobApply — Professional Job Application Email Replies</title>
        <meta name="description" content="Get professionally written job application email replies delivered to your inbox. Pay $20 via Paystack and stand out from the competition." />
      </Head>

      <Navbar />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Professional Email Writing Service
            </div>
            <h1 className="hero-title">
              Land Your Dream Job With a
              <em>Perfect Email Reply</em>
            </h1>
            <p className="hero-subtitle">
              Stop losing opportunities to poorly worded emails. Our experts craft tailored, professional job application email replies that get you noticed — delivered to your inbox within 24 hours.
            </p>
            <div className="hero-actions">
              <Link href="/apply" className="btn-primary">
                ✉ Apply Now — $20
              </Link>
              <Link href="#how-it-works" className="btn-secondary">
                See How It Works
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">400+</div>
                <div className="hero-stat-label">Applications Sent</div>
              </div>
              <div>
                <div className="hero-stat-num">94%</div>
                <div className="hero-stat-label">Success Rate</div>
              </div>
              <div>
                <div className="hero-stat-num">24hr</div>
                <div className="hero-stat-label">Turnaround Time</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <div className="email-preview-header">
                <div className="email-avatar">HR</div>
                <div className="email-meta">
                  <strong>Re: Software Engineer Position</strong>
                  <span>To: hiring@techcorp.com</span>
                </div>
              </div>
              <div className="email-subject">Your Crafted Reply — Ready to Send</div>
              <div className="email-body-preview">
                Dear Hiring Manager, Thank you for the opportunity to apply for the Software Engineer role at TechCorp. I am excited to share how my 4 years of experience in full-stack development aligns perfectly with your requirements…
              </div>
              <div className="email-tag">✓ Delivered &amp; Ready</div>
            </div>
            <div className="hero-card-float">
              <div className="hero-card-float-title">Avg. Response Rate</div>
              <div className="hero-card-float-val">+68%</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────── */}
      <section className="section" id="how-it-works">
        <div className="container">
          <div className="section-label">Simple Process</div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Four simple steps from application to receiving your professional email reply.
          </p>
          <div className="steps-grid">
            {[
              { n: 1, title: 'Fill the Form', desc: 'Provide your details, the job title, company name, and any specific requirements for the role you are applying for.' },
              { n: 2, title: 'Pay $20 via Paystack', desc: 'Complete a secure $20 payment through Paystack using your preferred payment method.' },
              { n: 3, title: 'We Write Your Email', desc: 'Our professional writers craft a tailored, compelling email reply specific to your application within 24 hours.' },
              { n: 4, title: 'Receive & Send', desc: 'Get the polished email in your inbox, review it, then send it directly to your prospective employer.' },
            ].map((step) => (
              <div className="step-card" key={step.n}>
                <div className="step-number">{step.n}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────── */}
      <section className="section section-alt" id="features">
        <div className="container">
          <div className="section-label">Why Choose Us</div>
          <h2 className="section-title">Everything You Need to Stand Out</h2>
          <p className="section-subtitle">
            From tailored writing to fast delivery, we make your job application process seamless and effective.
          </p>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      <section className="section" id="testimonials">
        <div className="container">
          <div className="section-label">Real Results</div>
          <h2 className="section-title">What Our Applicants Say</h2>
          <p className="section-subtitle">
            Join thousands of job seekers who have used our service to land interviews and offers.
          </p>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: t.bg }}>{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────── */}
      <section className="section section-alt" id="pricing">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-label">Simple Pricing</div>
          <h2 className="section-title">One Fee. One Perfect Email.</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            No subscriptions. No hidden costs. One flat fee per job application.
          </p>
          <div className="pricing-wrapper">
            <div className="pricing-card">
              <div className="pricing-badge">Per Application</div>
              <div className="pricing-price"><sup>$</sup>20</div>
              <p className="pricing-desc">One-time payment per job application</p>
              <ul className="pricing-features">
                <li><span className="pricing-check">✓</span> Fully personalised email reply</li>
                <li><span className="pricing-check">✓</span> Tailored to job description &amp; company</li>
                <li><span className="pricing-check">✓</span> Delivered within 24 hours</li>
                <li><span className="pricing-check">✓</span> Professional subject line included</li>
                <li><span className="pricing-check">✓</span> Secure Paystack payment processing</li>
                <li><span className="pricing-check">✓</span> Application tracking via reference number</li>
              </ul>
              <Link href="/apply">
                <button className="btn-pay">✉ Submit My Application — $20</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="section" id="faq">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-label">Questions</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Everything you need to know before applying.
          </p>
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div className={`faq-item${openFaq === i ? ' open' : ''}`} key={i}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <span className="faq-arrow">▼</span>
                </button>
                <div className="faq-answer">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)',
        padding: '90px 2rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'white', marginBottom: 16 }}>
            Ready to Land Your Next Job?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', marginBottom: 40, lineHeight: 1.7 }}>
            Don't let a poorly written email cost you your dream opportunity. Let our experts craft the perfect reply today.
          </p>
          <Link href="/apply" className="btn-primary" style={{ display: 'inline-flex', fontSize: '1.05rem' }}>
            ✉ Get Started — $20
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
