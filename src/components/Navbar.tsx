import { useState } from "react";
import { Menu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";

// Data navigasi dengan dukungan 2 bahasa (EN & ID)
const navTranslations = {
  EN: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Work Experience", href: "#workexperience" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ],
  ID: [
    { label: "Tentang", href: "#about" },
    { label: "Proyek", href: "#projects" },
    { label: "Pengalaman Kerja", href: "#workexperience" },
    { label: "Sertifikasi", href: "#certifications" },
    { label: "Kontak", href: "#contact" },
  ],
};

interface NavbarProps {
  lang: "ID" | "EN";
  onLanguageChange: (lang: "ID" | "EN") => void;
}

export function Navbar({ lang = "ID", onLanguageChange }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const currentNavItems = navTranslations[lang] || navTranslations.ID;

  const toggleLanguage = () => {
    onLanguageChange(lang === "EN" ? "ID" : "EN");
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="#about" className="flex items-center gap-2 font-semibold">
          <span>Portfolio</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {currentNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 font-medium text-xs"
            aria-label="Switch Language"
          >
            <Globe className="h-4 w-4" />
            <span className="uppercase">{lang}</span>
          </Button>

          <ThemeToggle />

          {/* Mobile Navigation Sheet */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button className="md:hidden" variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>{lang === "EN" ? "Navigation" : "Navigasi"}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-3">
                {currentNavItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-base py-2 px-3 rounded-md hover:bg-muted/60"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}