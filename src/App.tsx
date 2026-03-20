import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig, AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { useThemeStore } from "./store/themeStore";
import { useSunriseEffect } from "./hooks/useSunriseEffect";
import AppBar from "./components/AppBar";
import WelcomePopup from "./components/WelcomePopup";
import StarField from "./components/StarField";
import Index from "./pages/Index";
import CreateGreeting from "./pages/CreateGreeting";
import MyGreetings from "./pages/MyGreetings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/create" element={<CreateGreeting />} />
        <Route path="/greetings" element={<MyGreetings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const { isDark, hydrateTheme } = useThemeStore();

  // Fire the GSAP Sunrise animation when switching to Light Mode
  useSunriseEffect(isDark);

  useEffect(() => {
    hydrateTheme();
  }, [hydrateTheme]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDark]);

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="relative min-h-screen font-sans antialiased text-foreground bg-background transition-colors duration-500">
              <div className="celestial-pattern" />
              <div className="celestial-bg" />
              <StarField />
              <AppBar />
              <WelcomePopup />
              <AnimatedRoutes />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </MotionConfig>
    </QueryClientProvider>
  );
};

export default App;
