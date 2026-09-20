import React from 'react';
import {
  Sparkles,
  Shield,
  ShieldAlert,
  Lock,
  HeartHandshake,
  CheckCircle2,
  FileQuestion,
  Layers,
  ArrowRight,
  Database,
  Search,
  ExternalLink
} from 'lucide-react';
import { Button } from '../common/Button';
import { ActivePage } from '../../types/scheme';

interface AboutPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="about-page-container">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About SchemeMate AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Bridging the Gap Between Citizens and Welfare Schemes
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          An AI-powered public interest initiative engineered to simplify government welfare discovery,
          transcribe complex bureaucratic guidelines into plain language, and empower citizens with transparent eligibility clarity.
        </p>
      </div>

      {/* Prominent Disclaimer Card */}
      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3 shadow-2xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-bold text-amber-950 block mb-1">
            Mandatory Disclaimer & Legal Scope:
          </strong>
          SchemeMate AI is an independent informational discovery assistant created for hackathon demonstration.
          It is <strong>not</strong> an official government portal, nor is it endorsed by or affiliated with any
          ministry, central agency, or state department. Eligibility criteria, application forms, deadlines, and
          benefit sanctioning must always be verified through authorized government websites (such as India.gov.in,
          myScheme.gov.in, and official state department portals).
        </div>
      </div>

      {/* Why Personalized Discovery Matters */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-indigo-600" />
          <span>Why Personalized Scheme Discovery Matters in India</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The Union Government of India and State Governments fund hundreds of impactful welfare schemes across
          agriculture, higher education, healthcare subsidies, maternal support, housing, and micro-entrepreneurship.
          However, millions of eligible citizens miss out on their rightful benefits due to three persistent bottlenecks:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <h3 className="font-bold text-slate-900 mb-1.5">Information Fragmentation</h3>
            <p className="text-slate-600 leading-relaxed">
              Schemes are scattered across dozens of individual ministry websites, gazette notifications, and regional circulars.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <h3 className="font-bold text-slate-900 mb-1.5">Complex Bureaucratic Jargon</h3>
            <p className="text-slate-600 leading-relaxed">
              Eligibility conditions are written in legal policy language with obscure cut-offs that confuse everyday citizens.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <h3 className="font-bold text-slate-900 mb-1.5">Document Unpreparedness</h3>
            <p className="text-slate-600 leading-relaxed">
              Citizens often visit enrollment centers without the exact caste, domicile, or income certificates required.
            </p>
          </div>
        </div>
      </section>

      {/* How the System Works Conceptually */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-xs space-y-5">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <span>How the System Works Conceptually</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          SchemeMate AI operates on a multi-tier matching architecture designed for accuracy, speed, and privacy:
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-200 flex items-start gap-3">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Demographic Signal Ingestion</h3>
              <p className="text-slate-600 mt-0.5">
                The citizen provides high-level parameters: age, domicile state, district, occupation status, household income tier, and reservation category.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 flex items-start gap-3">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Multi-Factor Eligibility Scoring</h3>
              <p className="text-slate-600 mt-0.5">
                Our rule evaluation engine calculates weighted compatibility scores, comparing income caps, student enrollments, land-holding definitions, and age ranges.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 flex items-start gap-3">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Explainable Reasoning Synthesis</h3>
              <p className="text-slate-600 mt-0.5">
                Rather than giving an opaque recommendation, the system outputs clear "Why this may match" rationales alongside document checklists and official next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strict Privacy Principles */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600" />
          <span>Our Strict Privacy Principles</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Public welfare discovery should never compromise personal data privacy. We uphold ironclad privacy safeguards:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs">
            <div className="flex items-center gap-2 font-bold text-emerald-900 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>No Aadhaar Numbers</span>
            </div>
            <p className="text-slate-600">
              We never request, collect, or store 12-digit Aadhaar numbers, biometric data, or identity documents.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs">
            <div className="flex items-center gap-2 font-bold text-emerald-900 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>No Financial Credentials</span>
            </div>
            <p className="text-slate-600">
              We never ask for bank account numbers, IFSC codes, debit card details, UPI PINs, or SMS OTPs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs">
            <div className="flex items-center gap-2 font-bold text-emerald-900 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Local Session State</span>
            </div>
            <p className="text-slate-600">
              Profile responses exist only in temporary application memory to power your matching session.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs">
            <div className="flex items-center gap-2 font-bold text-emerald-900 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zero Advertising Trackers</span>
            </div>
            <p className="text-slate-600">
              Your demographic information is never monetized, brokered, or used for third-party commercial targeting.
            </p>
          </div>
        </div>
      </section>

      {/* Future Roadmap / RAG Architecture Vision */}
      <section className="rounded-2xl bg-indigo-900 text-white p-6 md:p-8 space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300 bg-white/10 px-2.5 py-0.5 rounded-full">
          <Database className="w-3.5 h-3.5" />
          <span>Product Vision & Architecture</span>
        </div>
        <h2 className="text-xl font-bold text-white">
          Full Knowledge Base & RAG Integration Roadmap
        </h2>
        <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
          For this initial hackathon build, SchemeMate AI showcases the full frontend interface, multi-step profile
          wizard, matching algorithms, and conversational assistant grounded in structured demo data.
        </p>
        <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
          In subsequent releases, the architecture will integrate with an end-to-end Retrieval-Augmented Generation (RAG)
          pipeline indexing thousands of verified central and state gazette publications with real-time vector embeddings,
          multilingual Indic speech models (Bhashini API), and direct integration with DigiLocker for consent-based document
          readiness checks.
        </p>

        <div className="pt-2">
          <Button
            variant="primary"
            size="md"
            className="bg-white text-indigo-900 hover:bg-slate-100 font-bold"
            onClick={() => onNavigate('profile-wizard')}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Try the Scheme Matcher Now
          </Button>
        </div>
      </section>
    </div>
  );
};
