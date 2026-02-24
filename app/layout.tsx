import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Unified Communication Service',
  description:
    'Send emails and SMS messages from a single interface. Auto-detects contact type, logs all messages to MongoDB, and tracks delivery status.',
  keywords: ['email', 'sms', 'communication', 'messaging', 'nodejs', 'nextjs'],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-view="professional">
      <body className={inter.variable}>
        {/* Animated Background */}
        <div className="page-bg" aria-hidden="true">
          <div className="page-bg-grid" />
        </div>

        {/* App Shell */}
        <div className="page-root">
          {/* Navbar */}
          <nav className="navbar" role="navigation" aria-label="Main navigation">
            <Link href="/" className="navbar-brand">
              <div className="navbar-logo" aria-hidden="true">📡</div>
              <span>CommService</span>
            </Link>

            <div className="navbar-links">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/send" className="nav-link">Send</Link>
              <Link href="/history" className="nav-link">History</Link>
              <span className="navbar-pill">v1.0</span>
            </div>
          </nav>

          {/* Page Content */}
          <main className="page-content">
            {children}
          </main>

          {/* Footer */}
          <footer className="footer">
            <p>
              Built with <span className="footer-accent">Next.js + Node.js + MongoDB</span> ·{' '}
              Unified Communication Service
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
