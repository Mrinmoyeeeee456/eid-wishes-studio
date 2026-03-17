import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { useThemeStore } from "./store/themeStore";
import AppBar from "./components/AppBar";
import StarField from "./components/StarField";
import Index from "./pages/Index";
import CreateGreeting from "./pages/CreateGreeting";
import MyGreetings from "./pages/MyGreetings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { isDark, hydrateTheme } = useThemeStore();

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
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="relative min-h-screen font-sans antialiased text-foreground bg-background transition-colors duration-500">
            <StarField />
            <AppBar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/create" element={<CreateGreeting />} />
              <Route path="/greetings" element={<MyGreetings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
