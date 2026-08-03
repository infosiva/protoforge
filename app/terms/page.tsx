import Link from 'next/link'

export const metadata = { title: 'Terms of Use — ProtoForge', description: 'Terms of use for ProtoForge.' }

export default function TermsPage() {
  return (
    <main style={{ maxWidth: 680, margin: '0 auto', padding: '60px 24px 80px', fontFamily: 'inherit', color: '#e8eaf0', background: '#080d1a' }}>
      <Link href="/" style={{ fontSize: 13, color: '#818cf8', textDecoration: 'none', display: 'inline-block', marginBottom: 32 }}>
        ← Back to ProtoForge
      </Link>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em' }}>Terms of Use</h1>
      <p style={{ fontSize: 13, color: 'rgba(232,234,240,0.5)', marginBottom: 32 }}>Last updated: June 2026</p>

      <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(232,234,240,0.75)', marginBottom: 16 }}>
        ProtoForge is a free tool to generate product prototypes. By using this service you agree to these terms.
      </p>

      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8, marginTop: 32 }}>Use of Service</h2>
      <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(232,234,240,0.75)', marginBottom: 16 }}>
        You may use ProtoForge to generate prototypes for personal or commercial projects. Do not use the service to generate harmful, illegal, or deceptive content.
      </p>

      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8, marginTop: 32 }}>Generated Content</h2>
      <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(232,234,240,0.75)', marginBottom: 16 }}>
        Prototype content is AI-generated and may not be accurate. Review all output before using in a real product. ProtoForge is not responsible for decisions made based on generated content.
      </p>

      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8, marginTop: 32 }}>Availability</h2>
      <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(232,234,240,0.75)', marginBottom: 16 }}>
        The service is provided &quot;as is&quot; without warranty. We may update or discontinue features at any time.
      </p>

      <p style={{ fontSize: 13, color: 'rgba(232,234,240,0.5)', marginTop: 48 }}>
        Questions? Contact us at <a href="mailto:hello@protofast.app" style={{ color: '#818cf8' }}>hello@protofast.app</a>
      </p>
    </main>
  )
}
