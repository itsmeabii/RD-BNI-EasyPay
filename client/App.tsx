import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Cart from "./pages/CartDrawer";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout/Checkout";
import TrainingDetail from "./pages/Training/[id]/page";
import NotFound from "./pages/NotFound";
import Journey from "./pages/Journey/JourneyPage";
import MyAccountLayout from "./pages/MyAccount/MyAccountLayout";
import AccountDetails from "./pages/MyAccount/AccountDetails";
import Addresses from "./pages/MyAccount/Addresses";
import Downloads from "./pages/MyAccount/Downloads";
import Logout from "./pages/MyAccount/Logout";
import MyWallet from "./pages/MyAccount/MyWallet";
import OrderHistory from "./pages/MyAccount/OrderHistory";
import TrainerApplication from "./pages/MyAccount/TrainerApplication";
import AuthPage from "./pages/Auth/AuthPage";
import UpcomingTraining from "./pages/MyAccount/UpcomingTraining";
import AdminLayout from "./pages/Admin/AdminLayout";
import CustomTrainings from "./pages/Admin/CustomTrainings";
import SuccessTreasureMap from "@/pages/Journey/SuccessMap/SuccessTreasureMap";
import SuccessMapWorkshopDetails from "./pages/Journey/SuccessMap/SuccessMapWorkshopDetails";
import MembershipRenewal from "./pages/Membership/MembershipRenewalPage";
import NewMembership from "./pages/Membership/NewMembershipPage";
import TrainerListPage from "./pages/Admin/TrainerListPage";
import ProtectedRoute from "./lib/utils/Protectedroute";
import ViewRecordsPage from "./pages/Admin/ViewRecordsPage";
import TrainingRequest from "./pages/TrainingRequest";
import LeadershipLayout from "./pages/LeadershipTeam/LeadershipLayout";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <CartProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/training" element={<Home />} />
                <Route path="/training/:id" element={<TrainingDetail />} />
                <Route path="/membership" element={<NewMembership />} />
                <Route path="/membership/renewal" element={<MembershipRenewal />} />
                <Route path="/checkout" element={<Checkout />} />

                {/* Protected: Member routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/my-account" element={<MyAccountLayout />}>
                    <Route path="account-details" element={<AccountDetails />} />
                    <Route path="addresses" element={<Addresses />} />
                    <Route path="downloads" element={<Downloads />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="my-wallet" element={<MyWallet />} />
                    <Route path="order-history" element={<OrderHistory />} />
                    <Route path="trainer-application" element={<TrainerApplication />} />
                    <Route path="upcoming-trainings" element={<UpcomingTraining />} />
                  </Route>
                </Route>

                {/* Protected: LT routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/leadership-account" element={<LeadershipLayout />}>
                    <Route path="account-details" element={<AccountDetails />} />
                    <Route path="addresses" element={<Addresses />} />
                    <Route path="downloads" element={<Downloads />} />
                    <Route path="my-wallet" element={<MyWallet />} />
                    <Route path="order-history" element={<OrderHistory />} />
                    <Route path="training-request" element={<TrainingRequest />} />
                    <Route path="logout" element={<Logout />} />
                  </Route>
                </Route>

                {/* Admin routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Navigate to="custom-trainings" replace />} />
                  <Route path="custom-trainings" element={<CustomTrainings />} />
                  <Route path="trainer-list" element={<TrainerListPage />} />
                  <Route path="view-records" element={<ViewRecordsPage />} />
                  <Route path="view-records/:id" element={<ViewRecordsPage />} />
                </Route>

                {/* Catch-all */}
                <Route path="/success-treasure-map/" element={<SuccessTreasureMap />} />
                <Route path="/success-treasure-map/:id" element={<SuccessMapWorkshopDetails />} />
                <Route path="/my-account/view-records" element={<ViewRecordsPage />} />
                <Route path="/my-account/view-records/:id" element={<ViewRecordsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Cart />
            </BrowserRouter>
          </CartProvider>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
