
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Home, 
  Menu, 
  Moon, 
  Sun, 
  User,
  X
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 blur-backdrop bg-background/80 border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-calm-deep bg-clip-text text-transparent">ZenMind</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
          <a href="#assessment" className="text-sm font-medium hover:text-primary transition-colors">Stress Assessment</a>
          <a href="#yoga" className="text-sm font-medium hover:text-primary transition-colors">Yoga</a>
          <a href="#articles" className="text-sm font-medium hover:text-primary transition-colors">Articles</a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
          
          <Button className="hidden md:flex">Get Started</Button>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b shadow-lg p-4 z-50">
          <nav className="flex flex-col gap-4">
            <a 
              href="#" 
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4" />
              Home
            </a>
            <a 
              href="#assessment" 
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Stress Assessment
            </a>
            <a 
              href="#yoga" 
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Yoga
            </a>
            <a 
              href="#articles" 
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Articles
            </a>
            <a 
              href="#about" 
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <Button className="w-full mt-2">Get Started</Button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
