
import React from 'react';
import { Button } from "@/components/ui/button";
import { Brain, Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-soothing-600" />
          <span className="font-bold text-xl bg-gradient-to-r from-mindful-600 to-soothing-600 bg-clip-text text-transparent">
            MindfulAI
          </span>
        </a>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-mindful-800" />
          ) : (
            <Menu className="h-6 w-6 text-mindful-800" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#features" className="text-mindful-800 hover:text-soothing-600 transition-colors">Features</a>
          <a href="#how-it-works" className="text-mindful-800 hover:text-soothing-600 transition-colors">How It Works</a>
          <a href="#privacy" className="text-mindful-800 hover:text-soothing-600 transition-colors">Privacy</a>
          <a href="#faq" className="text-mindful-800 hover:text-soothing-600 transition-colors">FAQ</a>
        </nav>

        {/* CTA Button (Desktop) */}
        <div className="hidden lg:block">
          <Button className="btn-primary" asChild>
            <Link to="/chat">
              <Activity className="h-4 w-4 mr-1" />
              Start Chatting
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-fade-in">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <a href="#features" className="text-mindful-800 py-2 hover:text-soothing-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="text-mindful-800 py-2 hover:text-soothing-600 transition-colors" onClick={() => setIsMenuOpen(false)}>How It Works</a>
            <a href="#privacy" className="text-mindful-800 py-2 hover:text-soothing-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Privacy</a>
            <a href="#faq" className="text-mindful-800 py-2 hover:text-soothing-600 transition-colors" onClick={() => setIsMenuOpen(false)}>FAQ</a>
            <Button className="btn-primary w-full justify-center mt-4" asChild>
              <Link to="/chat" onClick={() => setIsMenuOpen(false)}>
                <Activity className="h-4 w-4 mr-1" />
                Start Chatting
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
