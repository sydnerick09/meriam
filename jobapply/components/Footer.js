import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <span style={{
              background: '#1d5fdb',
              width: 34,
              height: 34,
              borderRadius: 9,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              color: 'white'
            }}>✉</span>
            Job<span>Apply</span>Pro
          </div>
          <p>
            We craft professional, tailored email replies that get you noticed by employers. Pay once, apply with confidence.
          </p>
        </div>

        <div className="footer-col">
          <h4>Platform</h4>
          <ul>
            <li><Link href="/apply">Submit Application</Link></li>
            <li><Link href="/status">Track Status</Link></li>
            <li><Link href="/#how-it-works">How It Works</Link></li>
            <li><Link href="/#pricing">Pricing</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><Link href="/#faq">FAQ</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><a href="mailto:support@jobapplypro.com">Email Support</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/refund">Refund Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} JobApplyPro. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="mailto:support@jobapplypro.com">Contact</a>
        </div>
      </div>
    </footer>
  );
}
