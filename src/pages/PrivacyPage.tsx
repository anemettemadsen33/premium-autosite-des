import { Card, CardContent } from '@/components/ui/card'

interface PrivacyPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function PrivacyPage({ onNavigate }: PrivacyPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-purple-900 text-primary-foreground py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-primary-foreground/80">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <Card>
          <CardContent className="p-8 prose prose-lg max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including when you create an account,
              post a listing, communicate with other users, or contact customer support.
            </p>

            <h3>Personal Information</h3>
            <ul>
              <li>Name and email address</li>
              <li>Phone number (optional)</li>
              <li>Location information</li>
              <li>Profile information and preferences</li>
            </ul>

            <h3>Vehicle Listing Information</h3>
            <ul>
              <li>Vehicle specifications and descriptions</li>
              <li>Images and media</li>
              <li>Pricing information</li>
              <li>Contact preferences</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Detect, prevent, and address fraud and security issues</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell or rent your personal information to third parties. We may share your information only:
            </p>
            <ul>
              <li>With other users when you post a listing</li>
              <li>With your consent or at your direction</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>

            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Export your data</li>
            </ul>

            <h2>6. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our service and hold
              certain information to improve and analyze our service.
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
              Our service is not directed to individuals under the age of 18. We do not knowingly collect
              personal information from children under 18.
            </p>

            <h2>8. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting
              the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at privacy@autosite.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
