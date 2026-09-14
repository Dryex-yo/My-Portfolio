import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/ThemeProvider";
import { Navbar } from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => {
  // Samakan tipe huruf kapital dengan Index ("ID" | "EN")
  const [lang, setLang] = useState<"ID" | "EN">("ID");

  // Handler untuk sinkronisasi dari Navbar jika Navbar mengirim "en"/"id"
  const handleLanguageChange = (newLang: string) => {
    setLang(newLang.toUpperCase() as "ID" | "EN");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ThemeProvider>
            <div className="min-h-screen bg-background text-foreground transition-colors">
              {/* Pass state dan handler ke Navbar */}
              <Navbar lang={lang} onLanguageChange={handleLanguageChange} />
              <Routes>
                {/* Pass lang DAN onLangChange ke Index agar sinkron 2 arah */}
                <Route 
                  path="/" 
                  element={<Index lang={lang} onLangChange={setLang} />} 
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </ThemeProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;