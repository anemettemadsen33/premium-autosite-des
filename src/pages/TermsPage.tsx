import { Card, CardContent } from '@/components/ui/card'

interface TermsPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function TermsPage({ onNavigate }: TermsPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-purple-900 text-primary-foreground py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-primary-foreground/80">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <Card>
          <CardContent className="p-8 prose prose-lg max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using AUTOSITE, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2>2. User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate, complete, and current information at all times.
              Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
            </p>

            <h2>3. Listing Guidelines</h2>
            <p>
              Users must ensure that all vehicle listings are accurate and honest. Misrepresentation of vehicles,
              including false descriptions, altered images, or incorrect pricing, is strictly prohibited.
            </p>

            <h2>4. Prohibited Activities</h2>
            <ul>
              <li>Posting fraudulent or misleading listings</li>
              <li>Harassing or threatening other users</li>
              <li>Using the platform for illegal activities</li>
              <li>Attempting to circumvent security measures</li>
            </ul>

            <h2>5. Transaction Responsibility</h2>
            <p>
              AUTOSITE acts as a marketplace platform only. We are not responsible for the actual transactions
              between buyers and sellers. Users are responsible for conducting their own due diligence.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              The platform and its original content, features, and functionality are owned by AUTOSITE and are
              protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              In no event shall AUTOSITE, nor its directors, employees, partners, agents, suppliers, or affiliates,
              be liable for any indirect, incidental, special, consequential, or punitive damages.
            </p>

            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material,
              we will provide at least 30 days notice prior to any new terms taking effect.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at legal@autosite.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
