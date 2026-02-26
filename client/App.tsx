import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Journey from "./pages/Journey";
import NotFound from "./pages/NotFound";
import Training from "./pages/Training";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Merchandise from "./pages/Merchandise";
import { Header } from "./components/Header";
import Index from './pages/ProductDetailedDescription';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/ProductDetailedDescription" element={<Index />} />
          <Route path="/" element={<Journey />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/training" element={<Training />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/merchandise" element={<Merchandise />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
