import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Journey from "./pages/Journey";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Merchandise from "./pages/Merchandise";
import Header from "./components/Header";
import Home from "./pages/Home";
import TrainingDetail from "./pages/Training/[id]/page";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header className="relative z-50" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/training" element={<Home />} />
          <Route path="/training/:id" element={<TrainingDetail />} />
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
