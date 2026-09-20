import React from 'react';
import { Sparkles, Shield, AlertTriangle, ExternalLink, Heart, Globe } from 'lucide-react';
import { ActivePage } from '../../types/scheme';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
  onOpenDisclaimer?: () => void;
  onOpenPrivacy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenDisclaimer,
  onOpenPrivacy
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">SchemeMate AI</span>
              <span className="text-[10px] font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded-full">
                Hackathon Prototype
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              AI-powered citizen welfare discovery assistant for India. Simplifying complex policy criteria,
              organizing documentation requirements, and guiding citizens toward official application portals.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Privacy First: Never requests Aadhaar numbers, OTPs, or bank credentials.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              Application
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  id="footer-nav-home"
                  onClick={() => onNavigate('home')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="footer-nav-wizard"
                  onClick={() => onNavigate('profile-wizard')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Check My Eligibility
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="footer-nav-explore"
                  onClick={() => onNavigate('explore')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Explore Schemes Directory
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="footer-nav-assistant"
                  onClick={() => onNavigate('ask-schememate')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Ask SchemeMate AI
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Verification */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              Governance & Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  id="footer-nav-about"
                  onClick={() => onNavigate('about')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  About SchemeMate AI
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="footer-nav-privacy"
                  onClick={onOpenPrivacy || (() => onNavigate('about'))}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Principles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="footer-nav-disclaimer"
                  onClick={onOpenDisclaimer || (() => onNavigate('about'))}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Disclaimer & Official Verification
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Prominent Notice */}
        <div className="py-6 border-b border-slate-800/80">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs leading-relaxed text-slate-300">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Official Notice & Disclaimer:</strong>
              SchemeMate AI is an informational assistance tool. Eligibility, benefits, and application requirements
              should always be verified through official government sources. SchemeMate AI is an independent project
              and is not affiliated with or endorsed by any government entity or ministry.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} SchemeMate AI • Demo Welfare Discovery Prototype
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              Pan-India Demo Welfare Dataset
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
