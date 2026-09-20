import React, { useState } from 'react';
import {
  Sparkles,
  Menu,
  X,
  Compass,
  FileQuestion,
  Info,
  CheckCircle,
  MessageSquare,
  Home
} from 'lucide-react';
import { ActivePage } from '../../types/scheme';
import { Button } from '../common/Button';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  hasProfile: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  hasProfile
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home, page: 'home' as ActivePage },
    { id: 'how-it-works', label: 'How It Works', icon: FileQuestion, page: 'home' as ActivePage, anchor: '#how-it-works' },
    { id: 'explore', label: 'Explore Schemes', icon: Compass, page: 'explore' as ActivePage },
    { id: 'ask-schememate', label: 'Ask SchemeMate', icon: MessageSquare, page: 'ask-schememate' as ActivePage },
    { id: 'about', label: 'About', icon: Info, page: 'about' as ActivePage }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            id="brand-logo-btn"
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-700 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-slate-900 font-display">
                  SchemeMate
                </span>
                <span className="text-xs font-bold text-white bg-indigo-600 px-1.5 py-0.5 rounded-md">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium block leading-none">
                Govt Scheme Matcher • India
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" id="desktop-nav-menu">
            {navLinks.map((item) => {
              const isActive = activePage === item.page && !item.anchor;
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`nav-link-${item.id}`}
                  onClick={() => {
                    if (item.anchor && activePage === 'home') {
                      const el = document.querySelector(item.anchor);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    } else if (item.anchor) {
                      handleNav('home');
                      setTimeout(() => {
                        const el = document.querySelector(item.anchor!);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      handleNav(item.page);
                    }
                  }}
                  className={`px-3 py-2 rounded-lg text-xs md:text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/70'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {hasProfile && (
              <button
                type="button"
                id="nav-link-my-results"
                onClick={() => handleNav('results')}
                className={`px-3 py-2 rounded-lg text-xs md:text-sm font-semibold transition-colors cursor-pointer ${
                  activePage === 'results'
                    ? 'text-indigo-600 bg-indigo-50/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                My Matches
              </button>
            )}
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              id="nav-check-eligibility-btn"
              variant="primary"
              size="sm"
              onClick={() => handleNav('profile-wizard')}
              icon={<CheckCircle className="w-3.5 h-3.5" />}
            >
              Check Eligibility
            </Button>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              id="mobile-nav-check-btn"
              variant="primary"
              size="sm"
              className="text-xs px-2.5 py-1.5"
              onClick={() => handleNav('profile-wizard')}
            >
              Check
            </Button>
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg">
          {navLinks.map((item) => (
            <button
              key={item.id}
              type="button"
              id={`mobile-nav-${item.id}`}
              onClick={() => {
                if (item.anchor && activePage === 'home') {
                  const el = document.querySelector(item.anchor);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                } else if (item.anchor) {
                  handleNav('home');
                  setTimeout(() => {
                    const el = document.querySelector(item.anchor!);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  handleNav(item.page);
                }
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
            >
              <item.icon className="w-4 h-4 text-slate-400" />
              <span>{item.label}</span>
            </button>
          ))}

          {hasProfile && (
            <button
              type="button"
              onClick={() => handleNav('results')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-indigo-700 bg-indigo-50 flex items-center gap-2.5 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4 text-indigo-600" />
              <span>My Matches</span>
            </button>
          )}

          <div className="pt-3">
            <Button
              id="mobile-menu-check-btn"
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => handleNav('profile-wizard')}
            >
              Check My Eligibility
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
