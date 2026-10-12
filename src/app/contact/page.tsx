import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Mail, MessageSquare, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | CreatorToolsHub',
  description: 'Have a tool suggestion, feedback, or business inquiry? Get in touch with the CreatorToolsHub team.',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />

      <header className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight">
          Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-teal">Touch</span>
        </h1>
        <p className="text-base text-text-muted">
          Have an idea for a new creator utility, found a bug, or want to discuss partnership opportunities? We'd love to hear from you.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 bg-surface-card border border-surface-border rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-brand-purple flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-text-primary">Direct Email</h2>
          <p className="text-xs text-text-muted">
            Send us an email anytime. We typically respond within 24 to 48 hours on business days.
          </p>
          <p className="text-sm font-mono text-brand-teal font-semibold pt-1">
            support@creatortoolshub.com
          </p>
        </div>

        <div className="p-6 bg-surface-card border border-surface-border rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-brand-teal flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-text-primary">Tool Requests</h2>
          <p className="text-xs text-text-muted">
            Need a specific calculation or automated workflow for your channel? Let us know and we’ll build it.
          </p>
          <p className="text-sm font-mono text-brand-purple font-semibold pt-1">
            requests@creatortoolshub.com
          </p>
        </div>
      </div>
    </div>
  );
}
