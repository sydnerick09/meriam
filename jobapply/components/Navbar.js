import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">
        <div className="navbar-logo-icon">✉</div>
        Job<span>Apply</span>Pro
      </Link>
      <ul className="navbar-links">
        <li><Link href="/#how-it-works">How It Works</Link></li>
        <li><Link href="/#features">Features</Link></li>
        <li><Link href="/#pricing">Pricing</Link></li>
        <li><Link href="/#faq">FAQ</Link></li>
        <li><Link href="/status">Track Application</Link></li>
        <li>
          <Link href="/apply" className="navbar-cta">
            Apply Now →
          </Link>
        </li>
      </ul>
    </nav>
  );
}
