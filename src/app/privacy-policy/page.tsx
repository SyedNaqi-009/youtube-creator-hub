import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy | CreatorToolsHub',
  description: 'CreatorToolsHub privacy policy: Learn how we protect creator data with client-side processing.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy', href: '/privacy-policy' }]} />

      <h1 className="text-3xl sm:text-4xl font-black text-text-primary">Privacy Policy</h1>
      <p className="text-xs text-text-muted">Last Updated: January 1, 2026</p>

      <div className="prose prose-invert max-w-none space-y-6 text-sm text-text-muted leading-relaxed">
        <h2 className="text-xl font-bold text-text-primary">1. Our Core Commitment to Privacy</h2>
        <p>
          At CreatorToolsHub, we believe you should not have to sacrifice privacy to optimize your content. Our website is engineered as a client-side utility suite: calculations, text generation, thumbnail checks, and conversions happen in your browser’s local execution environment.
        </p>

        <h2 className="text-xl font-bold text-text-primary">2. Information We Do NOT Collect</h2>
        <p>
          We do NOT require user account registration, passwords, or payment cards. We do NOT store your video titles, script outlines, revenue estimates, or uploaded thumbnail images on remote databases or persistent cloud storage.
        </p>

        <h2 className="text-xl font-bold text-text-primary">3. Analytics and Cookies</h2>
        <p>
          We may use minimal aggregated web analytics to measure platform performance, page load speeds, and popular tool usage. We also utilize local storage (localStorage) exclusively to store your interface theme preferences (dark/light mode).
        </p>

        <h2 className="text-xl font-bold text-text-primary">4. Advertising Disclosure</h2>
        <p>
          To maintain all tools as 100% free forever, this website may display contextual advertisements (such as Google AdSense). These third-party advertising partners may use cookies to serve ads based on prior visits to this or other websites. You may manage your ad preferences via your browser or Google Ad Settings.
        </p>

        <h2 className="text-xl font-bold text-text-primary">5. Contact</h2>
        <p>
          If you have any questions regarding this Privacy Policy, please contact privacy@creatortoolshub.com.
        </p>
      </div>
    </div>
  );
}
