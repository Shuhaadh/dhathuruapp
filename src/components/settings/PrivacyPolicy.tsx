import { ArrowLeft } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface PrivacyPolicyProps {
  onNavigate: (screen: string) => void;
  userType: 'customer' | 'captain';
}

export default function PrivacyPolicy({ onNavigate, userType }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#E8F4F8' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4"
           style={{ backgroundColor: '#0A2463' }}>
        <button
          onClick={() => onNavigate(userType === 'customer' ? 'customer-settings' : 'captain-settings')}
          className="text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-xl">Privacy Policy</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 flex flex-col">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 flex flex-col">
          <p className="text-sm text-[#666666] mb-4">Last Updated: November 26, 2025</p>
          
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-6 text-[#1A1A1A]">
              <section>
                <h2 className="text-[#0A2463] mb-2">1. INTRODUCTION</h2>
                <p className="text-[#666666]">
                  Avas Dhathuru ("we," "us," "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our speedboat booking platform.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">2. INFORMATION WE COLLECT</h2>
                
                <h3 className="text-[#001D39] mt-3 mb-1">2.1 Personal Information</h3>
                <ul className="text-[#666666] space-y-1 pl-4">
                  <li>• Full name</li>
                  <li>• Phone number</li>
                  <li>• Email address</li>
                  <li>• Date of birth</li>
                  <li>• Profile photo</li>
                </ul>

                <h3 className="text-[#001D39] mt-3 mb-1">2.2 Verification Documents (For Captains)</h3>
                <ul className="text-[#666666] space-y-1 pl-4">
                  <li>• Government-issued ID card</li>
                  <li>• Boat operator license</li>
                  <li>• Vessel registration documents</li>
                  <li>• Bank account information (for subscriptions)</li>
                </ul>

                <h3 className="text-[#001D39] mt-3 mb-1">2.3 Location Data</h3>
                <ul className="text-[#666666] space-y-1 pl-4">
                  <li>• GPS location during booking</li>
                  <li>• Pickup and dropoff locations</li>
                  <li>• Trip routes</li>
                </ul>

                <h3 className="text-[#001D39] mt-3 mb-1">2.4 Usage Data</h3>
                <ul className="text-[#666666] space-y-1 pl-4">
                  <li>• Booking history</li>
                  <li>• Search queries</li>
                  <li>• App interaction data</li>
                  <li>• Device information (model, OS version)</li>
                  <li>• IP address</li>
                </ul>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">3. HOW WE USE YOUR INFORMATION</h2>
                <ul className="text-[#666666] space-y-1 pl-4">
                  <li>• Process and manage bookings</li>
                  <li>• Verify captain credentials and licenses</li>
                  <li>• Send booking confirmations and notifications</li>
                  <li>• Process subscription payments</li>
                  <li>• Provide customer support</li>
                  <li>• Improve app features and user experience</li>
                  <li>• Comply with legal obligations</li>
                  <li>• Prevent fraud and ensure safety</li>
                </ul>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">4. INFORMATION SHARING</h2>
                <p className="text-[#666666] mb-2">
                  <strong>We DO NOT sell or rent your personal data.</strong>
                </p>
                <p className="text-[#666666] mb-2">We share information only with:</p>

                <h3 className="text-[#001D39] mt-3 mb-1">4.1 With Other Users</h3>
                <ul className="text-[#666666] space-y-1 pl-4">
                  <li>• Captains see customer names and contact info after booking</li>
                  <li>• Customers see captain names, photos, and boat info</li>
                </ul>

                <h3 className="text-[#001D39] mt-3 mb-1">4.2 Service Providers</h3>
                <ul className="text-[#666666] space-y-1 pl-4">
                  <li>• Payment processors (for subscriptions)</li>
                  <li>• Cloud storage providers</li>
                  <li>• Analytics services</li>
                </ul>

                <h3 className="text-[#001D39] mt-3 mb-1">4.3 Legal Requirements</h3>
                <ul className="text-[#666666] space-y-1 pl-4">
                  <li>• When required by Maldivian law</li>
                  <li>• Court orders or government requests</li>
                  <li>• To protect rights and safety</li>
                </ul>

                <h3 className="text-[#001D39] mt-3 mb-1">4.4 Business Transfers</h3>
                <p className="text-[#666666]">
                  In case of merger, acquisition, or asset sale
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">5. DATA SECURITY</h2>
                <p className="text-[#666666] mb-2">We implement security measures including:</p>
                <ul className="text-[#666666] space-y-1 pl-4">
                  <li>• Encrypted data transmission (SSL/TLS)</li>
                  <li>• Secure cloud storage</li>
                  <li>• Access controls and authentication</li>
                  <li>• Regular security audits</li>
                </ul>
                <p className="text-[#666666] mt-2">
                  However, no system is 100% secure. You are responsible for maintaining your password confidentiality.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">6. DATA RETENTION</h2>
                <ul className="text-[#666666] space-y-1 pl-4">
                  <li>• Active accounts: Data retained while account is active</li>
                  <li>• Deleted accounts: Data deleted within 30 days</li>
                  <li>• Legal requirements: Some data retained for compliance</li>
                  <li>• Booking history: Retained for 2 years for records</li>
                </ul>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">7. YOUR RIGHTS</h2>
                <p className="text-[#666666] mb-2">You have the right to:</p>
                <ul className="text-[#666666] space-y-1 pl-4">
                  <li>• Access your personal data</li>
                  <li>• Correct inaccurate information</li>
                  <li>• Delete your account and data</li>
                  <li>• Opt-out of marketing communications</li>
                  <li>• Download your data</li>
                  <li>• Object to data processing</li>
                </ul>
                <p className="text-[#666666] mt-2">
                  To exercise these rights: privacy@avasdhathuru.mv
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">8. LOCATION TRACKING</h2>
                <ul className="text-[#666666] space-y-1 pl-4">
                  <li>• Location used only during active bookings</li>
                  <li>• Can be disabled in phone settings</li>
                  <li>• Essential for trip tracking and safety</li>
                  <li>• Not tracked when app is closed</li>
                </ul>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">9. COOKIES & TRACKING</h2>
                <p className="text-[#666666] mb-2">We use:</p>
                <ul className="text-[#666666] space-y-1 pl-4">
                  <li>• Essential cookies for app functionality</li>
                  <li>• Analytics cookies to improve service</li>
                  <li>• You can control cookies in phone settings</li>
                </ul>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">10. THIRD-PARTY LINKS</h2>
                <p className="text-[#666666]">
                  App may contain links to external websites. We are not responsible for their privacy practices.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">11. CHILDREN'S PRIVACY</h2>
                <p className="text-[#666666]">
                  Avas Dhathuru is for users 18 years and older. We do not knowingly collect data from minors.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">12. INTERNATIONAL USERS</h2>
                <p className="text-[#666666]">
                  Service is based in Maldives. Data processed in accordance with Maldivian law.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">13. CHANGES TO PRIVACY POLICY</h2>
                <p className="text-[#666666]">
                  We may update this policy. Users notified of changes via app. Continued use constitutes acceptance of changes.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">14. CONTACT US</h2>
                <p className="text-[#666666]">
                  Privacy concerns or questions:
                </p>
                <p className="text-[#666666] mt-2">
                  Email: privacy@avasdhathuru.mv<br />
                  Phone: +960-XXX-XXXX<br />
                  Address: [Your business address in Maldives]
                </p>
              </section>
            </div>
          </ScrollArea>
        </div>

        {/* Back Button - Sticky at bottom */}
        <button
          onClick={() => onNavigate(userType === 'customer' ? 'customer-settings' : 'captain-settings')}
          className="w-full h-14 rounded-xl text-white shadow-lg mt-4"
          style={{
            background: 'linear-gradient(135deg, #0A2463 0%, #3BCEAC 100%)'
          }}
        >
          Back to Settings
        </button>
      </div>
    </div>
  );
}
