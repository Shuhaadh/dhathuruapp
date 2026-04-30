import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import CustomerSignUp from './components/CustomerSignUp';
import CustomerLogin from './components/CustomerLogin';
import CustomerHome from './components/CustomerHome';
import MyOrders from './components/MyOrders';
import CustomerProfile from './components/CustomerProfile';
import CustomerSettings from './components/CustomerSettings';
import EditProfile from './components/EditProfile';
import CaptainRegistration from './components/CaptainRegistration';
import CaptainLogin from './components/CaptainLogin';
import PendingApproval from './components/PendingApproval';
import CaptainOrders from './components/CaptainOrders';
import CaptainProfile from './components/CaptainProfile';
import CaptainSettings from './components/CaptainSettings';
import CaptainHistory from './components/CaptainHistory';
import EditCaptainProfile from './components/EditCaptainProfile';
import Notifications from './components/settings/Notifications';
import ChangePassword from './components/settings/ChangePassword';
import Language from './components/settings/Language';
import HelpCenter from './components/settings/HelpCenter';
import TermsConditions from './components/settings/TermsConditions';
import PrivacyPolicy from './components/settings/PrivacyPolicy';
import BoatInformation from './components/captain/BoatInformation';
import Pricing from './components/captain/Pricing';
import Availability from './components/captain/Availability';
import Subscription from './components/captain/Subscription';
import CaptainDashboard from './components/CaptainDashboard';
import AtollDetail from './components/AtollDetail';


// New Competitive Bidding Screens
import InterestedCaptains from './components/InterestedCaptains';
import CaptainOfferDetails from './components/CaptainOfferDetails';
import ChatWithCaptain from './components/ChatWithCaptain';
import ConfirmCaptain from './components/ConfirmCaptain';
import AvailableRequests from './components/AvailableRequests';
import SubmitBid from './components/SubmitBid';
import MyTakenBookings from './components/MyTakenBookings';
import UpdateOffer from './components/UpdateOffer';
import ChatWithCustomer from './components/ChatWithCustomer';
import ConfirmedBookings from './components/ConfirmedBookings';
import NotificationsList from './components/NotificationsList';
import ChatScreen from './components/ChatScreen';

// Rating System Screens
import RateTrip from './components/RateTrip';
import CaptainReviews from './components/CaptainReviews';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('splash');
  const [atollData, setAtollData] = useState({ atollName: '', orderCount: 0 });
  const [chatData, setChatData] = useState({ captainName: '' });
  const [bookingId, setBookingId] = useState<string>('');
  const [submitBidBookingId, setSubmitBidBookingId] = useState<string>('');
  const [chatScreenData, setChatScreenData] = useState({
    bookingId: '',
    otherPersonName: '',
    otherPersonId: '',
    otherPersonType: 'customer' as 'customer' | 'captain',
    route: '',
    backScreen: 'customer-home'
  });
  
  // Rating System State
  const [rateTripData, setRateTripData] = useState({
    bookingId: '',
    captainId: '',
    captainName: '',
    route: ''
  });

  const [captainReviewsData, setCaptainReviewsData] = useState({
    captainId: '',
    captainName: ''
  });

  // DEBUG: Log screen changes
  useEffect(() => {
    console.log('🔵 CURRENT SCREEN:', currentScreen);
  }, [currentScreen]);

  const handleNavigation = (screen: string, data?: any) => {
    console.log('🟢 NAVIGATING TO:', screen, data ? `with data: ${JSON.stringify(data)}` : '');
    
    // RESET ALL STATES when going to welcome (logout)
    if (screen === 'welcome') {
      console.log('🔴 RESETTING ALL STATES');
      setBookingId('');
      setSubmitBidBookingId('');
      setAtollData({ atollName: '', orderCount: 0 });
      setChatData({ captainName: '' });
      setChatScreenData({
        bookingId: '',
        otherPersonName: '',
        otherPersonId: '',
        otherPersonType: 'customer',
        route: '',
        backScreen: 'customer-home'
      });
      setRateTripData({
        bookingId: '',
        captainId: '',
        captainName: '',
        route: ''
      });
      setCaptainReviewsData({
        captainId: '',
        captainName: ''
      });
    }

    if (screen === 'atoll-detail' && data) {
      setAtollData({ atollName: data.atollName, orderCount: data.orderCount });
    }
    if (screen === 'chat-customer' && data) {
      setChatData({ captainName: data.captainName || 'Captain' });
    }
    if (screen === 'interested-captains' && typeof data === 'string') {
      setBookingId(data);
    }
    if (screen === 'submit-bid' && typeof data === 'string') {
      setSubmitBidBookingId(data);
    }
    // Handle chat screen data with backScreen
    if (screen === 'chat' && data) {
      setChatScreenData({
        bookingId: data.bookingId,
        otherPersonName: data.otherPersonName,
        otherPersonId: data.otherPersonId,
        otherPersonType: data.otherPersonType,
        route: data.route,
        backScreen: data.backScreen || 'customer-home'
      });
    }
    // Handle rate trip screen data
    if (screen === 'rate-trip' && data) {
      setRateTripData({
        bookingId: data.bookingId,
        captainId: data.captainId,
        captainName: data.captainName,
        route: data.route
      });
    }
    // Handle captain reviews screen data
    if (screen === 'captain-reviews' && data) {
      setCaptainReviewsData({
        captainId: data.captainId,
        captainName: data.captainName
      });
    }
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={() => handleNavigation('welcome')} />;
      case 'welcome':
        return <WelcomeScreen onNavigate={handleNavigation} />;
      case 'customer-signup':
        return <CustomerSignUp onNavigate={handleNavigation} />;
      case 'customer-login':
        return <CustomerLogin onNavigate={handleNavigation} />;
      case 'customer-home':
        return <CustomerHome onNavigate={handleNavigation} />;
      case 'my-orders':
        return <MyOrders onNavigate={handleNavigation} />;
      case 'customer-profile':
        return <CustomerProfile onNavigate={handleNavigation} />;
      case 'edit-profile':
        return <EditProfile onNavigate={handleNavigation} />;
      case 'customer-settings':
        return <CustomerSettings onNavigate={handleNavigation} />;
      case 'captain-registration':
        return <CaptainRegistration onNavigate={handleNavigation} />;
      case 'captain-login':
        return <CaptainLogin onNavigate={handleNavigation} />;
      case 'pending-approval':
        return <PendingApproval onNavigate={handleNavigation} />;
      case 'captain-dashboard':
        return <CaptainDashboard onNavigate={handleNavigation} />;
      case 'captain-orders':
        return <CaptainOrders onNavigate={handleNavigation} />;
      case 'captain-profile':
        return <CaptainProfile onNavigate={handleNavigation} />;
      case 'edit-captain-profile':
        return <EditCaptainProfile onNavigate={handleNavigation} />;
      case 'captain-settings':
        return <CaptainSettings onNavigate={handleNavigation} />;
      case 'captain-history':
        return <CaptainHistory onNavigate={handleNavigation} />;
      
      // Customer Settings Screens
      case 'notifications-customer':
        return <Notifications onNavigate={handleNavigation} userType="customer" />;
      case 'change-password-customer':
        return <ChangePassword onNavigate={handleNavigation} userType="customer" />;
      case 'language-customer':
        return <Language onNavigate={handleNavigation} userType="customer" />;
      case 'help-center-customer':
        return <HelpCenter onNavigate={handleNavigation} userType="customer" />;
      case 'terms-conditions-customer':
        return <TermsConditions onNavigate={handleNavigation} userType="customer" />;
      case 'privacy-policy-customer':
        return <PrivacyPolicy onNavigate={handleNavigation} userType="customer" />;
      
      // Captain Settings Screens
      case 'notifications-captain':
        return <Notifications onNavigate={handleNavigation} userType="captain" />;
      case 'change-password-captain':
        return <ChangePassword onNavigate={handleNavigation} userType="captain" />;
      case 'language-captain':
        return <Language onNavigate={handleNavigation} userType="captain" />;
      case 'help-center-captain':
        return <HelpCenter onNavigate={handleNavigation} userType="captain" />;
      case 'terms-conditions-captain':
        return <TermsConditions onNavigate={handleNavigation} userType="captain" />;
      case 'privacy-policy-captain':
        return <PrivacyPolicy onNavigate={handleNavigation} userType="captain" />;
        
      
      // Captain Additional Screens
      case 'boat-information':
        return <BoatInformation onNavigate={handleNavigation} />;
      case 'pricing':
        return <Pricing onNavigate={handleNavigation} />;
      case 'availability':
        return <Availability onNavigate={handleNavigation} />;
      case 'subscription':
        return <Subscription onNavigate={handleNavigation} />;
      case 'atoll-detail':
        return <AtollDetail onNavigate={handleNavigation} atollName={atollData.atollName} orderCount={atollData.orderCount} />;
      
      // Competitive Bidding - Customer Screens
      case 'interested-captains':
        return <InterestedCaptains bookingId={bookingId} onBack={() => handleNavigation('customer-home')} onNavigate={handleNavigation} />;
      case 'captain-offer-details':
        return <CaptainOfferDetails onNavigate={handleNavigation} />;
      case 'chat-customer':
        return <ChatWithCaptain onNavigate={handleNavigation} captainName={chatData.captainName} />;
      case 'confirm-captain':
        return <ConfirmCaptain onNavigate={handleNavigation} />;
      
      // Competitive Bidding - Captain Screens
      case 'available-requests':
        return <AvailableRequests onNavigate={handleNavigation} />;
      case 'submit-bid':
        return <SubmitBid bookingId={submitBidBookingId} onNavigate={handleNavigation} />;
      case 'my-taken-bookings':
        return <MyTakenBookings onNavigate={handleNavigation} />;
      case 'update-offer':
        return <UpdateOffer onNavigate={handleNavigation} />;
      case 'chat-captain':
        return <ChatWithCustomer onNavigate={handleNavigation} />;
      case 'confirmed-bookings':
        return <ConfirmedBookings onNavigate={handleNavigation} />;
      
      // Chat Screen (universal for both customer and captain)
      case 'chat':
        return (
          <ChatScreen 
            bookingId={chatScreenData.bookingId}
            otherPersonName={chatScreenData.otherPersonName}
            otherPersonType={chatScreenData.otherPersonType}
            route={chatScreenData.route}
            onBack={() => handleNavigation(chatScreenData.backScreen, chatScreenData.bookingId)}
          />
        );
      
      // Notifications
      case 'notifications-list-customer':
        return <NotificationsList onNavigate={handleNavigation} userType="customer" />;
      case 'notifications-list-captain':
        return <NotificationsList onNavigate={handleNavigation} userType="captain" />;
      
      // Rating System Screens
      case 'rate-trip':
        return (
          <RateTrip
            bookingId={rateTripData.bookingId}
            captainId={rateTripData.captainId}
            captainName={rateTripData.captainName}
            route={rateTripData.route}
            onBack={() => handleNavigation('customer-home')}
          />
        );

      case 'captain-reviews':
        return (
          <CaptainReviews
            captainId={captainReviewsData.captainId}
            captainName={captainReviewsData.captainName}
            onBack={() => handleNavigation('interested-captains', bookingId)}
          />
        );
      
      default:
        console.log('⚠️ UNKNOWN SCREEN, defaulting to welcome');
        return <WelcomeScreen onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderScreen()}
      <Toaster />
    </div>
  );
}