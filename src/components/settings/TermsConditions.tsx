import { ArrowLeft } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface TermsConditionsProps {
  onNavigate: (screen: string) => void;
  userType: 'customer' | 'captain';
}

export default function TermsConditions({ onNavigate, userType }: TermsConditionsProps) {
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
        <h1 className="text-white text-xl">Terms & Conditions</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 flex flex-col">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 flex flex-col">
          <p className="text-sm text-[#666666] mb-4">Last Updated: November 26, 2025</p>
          
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-6 text-[#1A1A1A]">
              <section>
                <h2 className="text-[#0A2463] mb-2">1. ACCEPTANCE OF TERMS</h2>
                <p className="text-[#666666]">
                  By using Avas Dhathuru mobile application, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the platform.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">2. DEFINITIONS</h2>
                <ul className="text-[#666666] space-y-1 pl-4">
                  <li>• "Platform" refers to Avas Dhathuru mobile application</li>
                  <li>• "Captain" means registered speedboat operators</li>
                  <li>• "Customer" means users booking speedboat services</li>
                  <li>• "We/Us" refers to Avas Dhathuru</li>
                </ul>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">3. USER ACCOUNTS</h2>
                <h3 className="text-[#001D39] mt-3 mb-1">3.1 Account Registration</h3>
                <p className="text-[#666666]">
                  Users must provide accurate, current information during registration. All information provided must be truthful and up-to-date.
                </p>
                <h3 className="text-[#001D39] mt-3 mb-1">3.2 Account Security</h3>
                <p className="text-[#666666]">
                  You are responsible for maintaining confidentiality of your account credentials and for all activities under your account.
                </p>
                <h3 className="text-[#001D39] mt-3 mb-1">3.3 Account Eligibility</h3>
                <p className="text-[#666666]">
                  Users must be 18 years or older to create an account and use our services.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">4. CAPTAIN OBLIGATIONS</h2>
                <h3 className="text-[#001D39] mt-3 mb-1">4.1 License Requirements</h3>
                <p className="text-[#666666]">
                  All captains must possess valid boat operator licenses issued by relevant Maldivian authorities.
                </p>
                <h3 className="text-[#001D39] mt-3 mb-1">4.2 Vessel Safety Standards</h3>
                <p className="text-[#666666]">
                  Captains must ensure vessels meet Maldives maritime safety standards and are properly maintained.
                </p>
                <h3 className="text-[#001D39] mt-3 mb-1">4.3 Insurance Requirements</h3>
                <p className="text-[#666666]">
                  Captains must maintain valid insurance coverage for their vessels and passengers.
                </p>
                <h3 className="text-[#001D39] mt-3 mb-1">4.4 ID Verification</h3>
                <p className="text-[#666666]">
                  Captains must submit government-issued ID and boat license for verification before accepting bookings.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">5. CUSTOMER OBLIGATIONS</h2>
                <h3 className="text-[#001D39] mt-3 mb-1">5.1 Booking Conduct</h3>
                <p className="text-[#666666]">
                  Customers must arrive at agreed pickup location on time and provide accurate booking information.
                </p>
                <h3 className="text-[#001D39] mt-3 mb-1">5.2 Payment</h3>
                <p className="text-[#666666]">
                  Customers pay captains directly for trips. Platform does not process trip payments.
                </p>
                <h3 className="text-[#001D39] mt-3 mb-1">5.3 Respectful Behavior</h3>
                <p className="text-[#666666]">
                  Customers must treat captains and vessels with respect and follow safety instructions.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">6. PLATFORM SUBSCRIPTION (FOR CAPTAINS)</h2>
                <h3 className="text-[#001D39] mt-3 mb-1">6.1 Subscription Fees</h3>
                <p className="text-[#666666]">
                  Captains pay MVR 500 monthly subscription via bank transfer to access the platform.
                </p>
                <h3 className="text-[#001D39] mt-3 mb-1">6.2 Payment Terms</h3>
                <p className="text-[#666666]">
                  Subscriptions must be paid by due date. Receipt upload required for verification.
                </p>
                <h3 className="text-[#001D39] mt-3 mb-1">6.3 Account Suspension</h3>
                <p className="text-[#666666]">
                  Accounts suspended for non-payment after 3 days grace period.
                </p>
                <h3 className="text-[#001D39] mt-3 mb-1">6.4 No Refunds</h3>
                <p className="text-[#666666]">
                  Subscription fees are non-refundable once paid.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">7. BOOKING PROCESS</h2>
                <h3 className="text-[#001D39] mt-3 mb-1">7.1 Booking Requests</h3>
                <p className="text-[#666666]">
                  Customers submit booking requests through the app with trip details.
                </p>
                <h3 className="text-[#001D39] mt-3 mb-1">7.2 Captain Acceptance</h3>
                <p className="text-[#666666]">
                  Captains can accept or decline booking requests based on availability.
                </p>
                <h3 className="text-[#001D39] mt-3 mb-1">7.3 Trip Completion</h3>
                <p className="text-[#666666]">
                  Both parties must confirm trip completion in the app.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">8. PAYMENTS & REFUNDS</h2>
                <h3 className="text-[#001D39] mt-3 mb-1">8.1 Direct Payment</h3>
                <p className="text-[#666666]">
                  All trip payments are between customer and captain directly.
                </p>
                <h3 className="text-[#001D39] mt-3 mb-1">8.2 Platform Role</h3>
                <p className="text-[#666666]">
                  Avas Dhathuru does not process trip payments and acts only as marketplace.
                </p>
                <h3 className="text-[#001D39] mt-3 mb-1">8.3 Disputes</h3>
                <p className="text-[#666666]">
                  Payment disputes must be resolved between customer and captain.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">9. CANCELLATION POLICY</h2>
                <h3 className="text-[#001D39] mt-3 mb-1">9.1 Customer Cancellation</h3>
                <p className="text-[#666666]">
                  Free cancellation up to 24 hours before trip. Late cancellations may incur fees.
                </p>
                <h3 className="text-[#001D39] mt-3 mb-1">9.2 Captain Cancellation</h3>
                <p className="text-[#666666]">
                  Captains must provide 12 hours notice for cancellations.
                </p>
                <h3 className="text-[#001D39] mt-3 mb-1">9.3 Weather Cancellations</h3>
                <p className="text-[#666666]">
                  No penalty for weather-related cancellations by either party.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">10. LIABILITY & INSURANCE</h2>
                <h3 className="text-[#001D39] mt-3 mb-1">10.1 Platform Limitation</h3>
                <p className="text-[#666666]">
                  Avas Dhathuru acts as a marketplace platform only and is not liable for incidents during trips.
                </p>
                <h3 className="text-[#001D39] mt-3 mb-1">10.2 Captain Liability</h3>
                <p className="text-[#666666]">
                  Captains are solely responsible for passenger safety during trips.
                </p>
                <h3 className="text-[#001D39] mt-3 mb-1">10.3 Insurance</h3>
                <p className="text-[#666666]">
                  Platform does not provide insurance coverage. Captains must have their own insurance.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">11. PROHIBITED CONDUCT</h2>
                <ul className="text-[#666666] space-y-1 pl-4">
                  <li>• Providing false information</li>
                  <li>• Operating without valid licenses</li>
                  <li>• Harassment or discrimination</li>
                  <li>• Fraudulent bookings</li>
                  <li>• Violation of maritime laws</li>
                </ul>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">12. INTELLECTUAL PROPERTY</h2>
                <p className="text-[#666666]">
                  All content, trademarks, and logos are property of Avas Dhathuru and protected by law.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">13. PRIVACY & DATA</h2>
                <p className="text-[#666666]">
                  Please refer to our Privacy Policy for data handling practices.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">14. TERMINATION</h2>
                <p className="text-[#666666]">
                  We reserve the right to suspend or terminate accounts for violations of these terms.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">15. DISPUTE RESOLUTION</h2>
                <p className="text-[#666666]">
                  Disputes governed by laws of Republic of Maldives. Mediation preferred before legal action.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">16. CHANGES TO TERMS</h2>
                <p className="text-[#666666]">
                  We may update these terms. Users will be notified of changes via app notification.
                </p>
              </section>

              <section>
                <h2 className="text-[#0A2463] mb-2">17. CONTACT INFORMATION</h2>
                <p className="text-[#666666]">
                  For questions about these terms:
                </p>
                <p className="text-[#666666] mt-2">
                  Email: legal@avasdhathuru.mv<br />
                  Phone: +960-XXX-XXXX
                </p>
              </section>
            </div>
          </ScrollArea>
        </div>

        {/* Accept Button - Sticky at bottom */}
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
