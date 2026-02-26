import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Journey from "./pages/Journey";
import NotFound from "./pages/NotFound";
import { UpcomingTrainings } from "./pages/Training";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Merchandise from "./pages/Merchandise";
import { Header } from "./components/Header";
import AccountDetails from "./pages/my-account/AccountDetails";
import Addresses from "./pages/my-account/Addresses";
import Downloads from "./pages/my-account/Downloads";
import Logout from "./pages/my-account/Logout";
import MyWallet from "./pages/my-account/MyWallet";
import OrderHistory from "./pages/my-account/OrderHistory";
import TrainerApplication from "./pages/my-account/TrainerApplication";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Journey />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/merchandise" element={<Merchandise />} />
          <Route path="/my-account/UpcomingTrainings" element={<UpcomingTrainings />} />
          <Route path="/my-account/AccountDetails" element={<AccountDetails/>} />
          <Route path="/my-account/Addresses" element={<Addresses />} />
          <Route path="/my-account/Downloads" element={<Downloads />} />
          <Route path="/my-account/Logout" element={<Logout />} />
          <Route path="/my-account/MyWallet" element={<MyWallet />} />
          <Route path="/my-account/OrderHistory" element={<OrderHistory />} />
          <Route path="/my-account/TrainerApplication" element={<TrainerApplication />} />




          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
