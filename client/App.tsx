import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Cart from "./pages/CartDrawer";
import Home from "./pages/Home";
import Membership from "./pages/Membership/NewMembershipPage";
import Merchandise from "./pages/Merchandise";
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
                <Route path="/membership" element={<Membership />} />
                <Route path="/merchandise" element={<Merchandise />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<NotFound />} />

                {/* My Account routes — all share the sidebar layout */}
                <Route path="/my-account" element={<MyAccountLayout />}>
                  <Route path="AccountDetails" element={<AccountDetails />} />
                  <Route path="Addresses" element={<Addresses />} />
                  <Route path="Downloads" element={<Downloads />} />
                  <Route path="Logout" element={<Logout />} />
                  <Route path="MyWallet" element={<MyWallet />} />
                  <Route path="OrderHistory" element={<OrderHistory />} />
                  <Route path="TrainerApplication" element={<TrainerApplication />} />
                  <Route path="UpcomingTraining" element={<UpcomingTraining />} />
                </Route>
              </Routes>
              <Cart />
            </BrowserRouter>
          </CartProvider>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}