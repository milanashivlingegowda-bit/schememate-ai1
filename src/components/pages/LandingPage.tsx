import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Compass,
  FileCheck2,
  FileText,
  Search,
  ExternalLink,
  ShieldCheck,
  Users,
  CheckCircle2,
  Lock,
  Layers,
  HelpCircle,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { Button } from '../common/Button';
import { ActivePage, DemoScheme } from '../../types/scheme';

interface LandingPageProps {
  onNavigate: (page: ActivePage) => void;
  featuredSchemes: DemoScheme[];
  onSelectScheme: (schemeId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  featuredSchemes,
  onSelectScheme
}) => {
  return (
    <div className="space-y-16 md:space-y-24 pb-16" id="landing-page-container">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 md:pt-16 pb-12">
        {/* Subtle background glow accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -top-10 right-10 w-72 h-72 bg-blue-400/10 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>AI-Powered Citizen Welfare Discovery</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span className="text-indigo-600/80">Demo Prototype</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Find Government Schemes{' '}
                <span className="text-indigo-600 bg-clip-text">You May Be Eligible For</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Tell us about yourself and let AI identify government schemes that may be relevant to you, explain
                eligibility requirements, and guide you toward official application information.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Button
                  id="hero-check-eligibility-btn"
                  variant="primary"
                  size="lg"
                  onClick={() => onNavigate('profile-wizard')}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="w-full sm:w-auto shadow-md shadow-indigo-500/15"
                >
                  Check My Eligibility
                </Button>

                <Button
                  id="hero-explore-schemes-btn"
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate('explore')}
                  icon={<Compass className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Explore Schemes
                </Button>
              </div>

              {/* Trust signals */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>No Aadhaar or Bank details requested</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Free & Open Citizen Tool</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Central & State Welfare Catalog</span>
                </div>
              </div>
            </div>

            {/* Right Graphic: Modern Civic-Tech Visual Component */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xl shadow-slate-200/50">
                {/* Decorative header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-semibold text-slate-400 ml-2">Scheme Matching Engine</span>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    Live Demo
                  </span>
                </div>

                {/* Simulated Matching Card 1 */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 mb-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100/60 px-2 py-0.5 rounded">
                      Agriculture Support
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      94% Match
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">PM Kisan Samman Nidhi (Demo)</h4>
                  <div className="text-xs text-slate-500 flex items-center justify-between">
                    <span>Direct bank benefit: ₹6,000/yr</span>
                    <span className="text-indigo-600 font-semibold">Matched to Farmer</span>
                  </div>
                </div>

                {/* Simulated Matching Card 2 */}
                <div className="p-3.5 rounded-xl bg-indigo-50/40 border border-indigo-100 mb-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
                      Higher Education
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      91% Match
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">Post-Matric Scholarship (Demo)</h4>
                  <div className="text-xs text-slate-500 flex items-center justify-between">
                    <span>Tuition waiver + Monthly stipend</span>
                    <span className="text-indigo-600 font-semibold">Student Quota</span>
                  </div>
                </div>

                {/* AI Reasoning pill */}
                <div className="p-3 rounded-xl bg-slate-900 text-white text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-indigo-300 font-bold text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>SchemeMate AI Explanation:</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    "Identified 6 high-affinity schemes matching your demographic bracket, household income tier, and occupation status."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20" id="how-it-works">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            Step-by-step Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            How SchemeMate AI Works
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Four simple steps to discover, understand, and prepare for government welfare programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Build Your Profile</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide basic demographic signals like state, occupation, income tier, and social category in a secure 4-step wizard.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Zero sensitive data required
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">AI Matches Relevant Schemes</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our eligibility engine cross-examines central and state welfare programs to calculate compatibility percentages.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Weighted multi-factor matching
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Understand Eligibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Read plain-language explanations of why you matched, document checklists, and financial or non-financial benefits.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Transparent "Why it matches" reasoning
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm mb-4">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Find Official Information</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive direct guidance to authorized government departments, official portal URLs, and application steps.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Official verification guidance
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            Key Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Built for Transparency and Ease
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Engineered to overcome bureaucratic jargon and make welfare discovery seamless for every citizen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:border-indigo-200 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Personalized Matching</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dynamically calculates scheme suitability based on age, income bracket, occupation, and social quotas instead of generic lists.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:border-indigo-200 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Eligibility Explanation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Breaks down intricate government rules into transparent, itemized criteria so you know exactly which requirements apply.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:border-indigo-200 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Required Documents</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provides practical checklists of certificates, revenue records, and identity proofs needed before you visit the portal.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:border-indigo-200 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4">
              <ExternalLink className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Official Source Guidance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Guiding links to authorized departments, state portals, and designated Common Service Centres (CSCs) for legal submission.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Schemes Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Demo Scheme Catalogue
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Popular Welfare Initiatives
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Sample programs modeled in this prototype across diverse sectors
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('explore')}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            View All {featuredSchemes.length}+ Schemes
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSchemes.slice(0, 3).map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md">
                    {scheme.category}
                  </span>
                  <span className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    Demo Data
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-2 line-clamp-1">
                  {scheme.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {scheme.shortDescription}
                </p>
                <div className="mt-3 p-2.5 bg-slate-50 rounded-lg text-xs text-slate-700">
                  <span className="font-semibold text-slate-900">Benefit:</span> {scheme.benefits.summary}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-600">Verification Required</span>
                <button
                  type="button"
                  onClick={() => onSelectScheme(scheme.id)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pre-Wizard Conversion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>Fast 2-Minute Citizen Assessment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to see which schemes you qualify for?
            </h2>
            <p className="text-sm text-indigo-100 leading-relaxed">
              Complete your basic profile without sharing any sensitive identifiers. Get personalized scheme
              affinity scores and guidance right away.
            </p>
            <div className="pt-2">
              <Button
                id="cta-start-wizard-btn"
                variant="primary"
                size="lg"
                className="bg-white text-indigo-900 hover:bg-slate-100 font-bold shadow-lg"
                onClick={() => onNavigate('profile-wizard')}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Start Profile Assessment
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
