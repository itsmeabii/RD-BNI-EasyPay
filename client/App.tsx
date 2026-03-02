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
import Membership from "./pages/Membership/NewMembershipPage";
import Merchandise from "./pages/Merchandise";
import Checkout from "./pages/Checkout/Checkout";
import TrainingDetail from "./pages/Training/[id]/page";
import NotFound from "./pages/NotFound";
import SuccessTreasureMap from "@/pages/Journey/SuccessMap/SuccessTreasureMap";
import SuccessMapWorkshopDetails from "./pages/Journey/SuccessMap/SuccessMapWorkshopDetails";

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
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/training" element={<Home />} />
                <Route path="/training/:id" element={<TrainingDetail />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/merchandise" element={<Merchandise />} />
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