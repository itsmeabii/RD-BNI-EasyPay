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
import Journey from "./pages/Journey/JourneyPage";
import AuthPage from "./pages/Auth/AuthPage";
import Merchandise from "./pages/Merchandise";
import Checkout from "./pages/Checkout/Checkout";
import TrainingDetail from "./pages/Training/[id]/page";
import NotFound from "./pages/NotFound";
import SuccessTreasureMap from "@/pages/Journey/SuccessMap/SuccessTreasureMap";
import SuccessMapWorkshopDetails from "./pages/Journey/SuccessMap/SuccessMapWorkshopDetails";
import MembershipRenewal from "./pages/Membership/MembershipRenewalPage";
import NewMembership from "./pages/Membership/NewMembershipPage";
import Index from './pages/ProductDetailedDescription';
import TrainerApplication from "./pages/TrainerApplication";
import TrainingRequest from "./pages/TrainingRequest";



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
                <Route path="/ProductDetailedDescription" element={<Index />} />
          <Route path="/" element={<Home />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/training" element={<Home />} />
                <Route path="/training/:id" element={<TrainingDetail />} />
                <Route path="/membership" element={<NewMembership />} />
                <Route path="/membership/renewal" element={<MembershipRenewal />} />
                <Route path="/merchandise" element={<Merchandise />} />
                <Route path="/trainerapplication" element={<TrainerApplication />} />
            <Route path="/trainingrequest" element={<TrainingRequest />} />
            <Route path="/checkout" element={<Checkout />} />
                <Route path="/success-treasure-map/" element={<SuccessTreasureMap />} />
                <Route path="/success-treasure-map/:id" element={<SuccessMapWorkshopDetails />} />
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