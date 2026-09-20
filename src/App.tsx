import React, { useState, useEffect, useTransition } from 'react';
import {
  ActivePage,
  UserProfile,
  DemoScheme,
  SchemeMatchResult
} from './types/scheme';
import { apiService } from './services/api';
import { DEMO_SCHEMES } from './data/demoSchemes';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { LandingPage } from './components/pages/LandingPage';
import { ProfileWizard } from './components/pages/ProfileWizard';
import { ProcessingScreen } from './components/pages/ProcessingScreen';
import { ResultsDashboard } from './components/pages/ResultsDashboard';
import { SchemeDetails } from './components/pages/SchemeDetails';
import { AskSchemeMate } from './components/pages/AskSchemeMate';
import { ExploreSchemes } from './components/pages/ExploreSchemes';
import { AboutPage } from './components/pages/AboutPage';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('schememate_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return null;
  });

  const [schemes, setSchemes] = useState<DemoScheme[]>(DEMO_SCHEMES);
  const [matchResults, setMatchResults] = useState<SchemeMatchResult[]>([]);
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(null);
  const [assistantSchemeContext, setAssistantSchemeContext] = useState<DemoScheme | null>(null);

  const [isLoadingMatches, setIsLoadingMatches] = useState(false);
  const [isErrorMatches, setIsErrorMatches] = useState(false);

  // Load schemes from backend on initial mount
  useEffect(() => {
    let isMounted = true;
    apiService.getAllSchemes()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setSchemes(data);
        }
      })
      .catch((err) => {
        console.warn('Backend load failed, utilizing robust local demo schemes fallback:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute matches if profile exists on mount
  useEffect(() => {
    if (userProfile) {
      loadMatchesForProfile(userProfile);
    }
  }, []);

  const loadMatchesForProfile = async (profile: UserProfile) => {
    setIsLoadingMatches(true);
    setIsErrorMatches(false);
    try {
      const results = await apiService.getSchemeMatches(profile);
      setMatchResults(results);
    } catch (err) {
      console.error('Error calculating scheme matches:', err);
      setIsErrorMatches(true);
    } finally {
      setIsLoadingMatches(false);
    }
  };

  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    try {
      localStorage.setItem('schememate_profile', JSON.stringify(profile));
    } catch (e) {
      // ignore
    }
    // Start processing state
    setActivePage('processing');
    loadMatchesForProfile(profile);
  };

  const handleProcessingComplete = () => {
    setActivePage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewSchemeDetails = (schemeId: string) => {
    setSelectedSchemeId(schemeId);
    setActivePage('scheme-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAI = (schemeId?: string) => {
    if (schemeId) {
      const targetScheme = schemes.find((s) => s.id === schemeId);
      setAssistantSchemeContext(targetScheme || null);
    }
    setActivePage('ask-schememate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find currently selected scheme
  const selectedScheme = schemes.find((s) => s.id === selectedSchemeId) || schemes[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        hasProfile={!!userProfile}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'home' && (
          <LandingPage
            onNavigate={handleNavigate}
            featuredSchemes={schemes}
            onSelectScheme={handleViewSchemeDetails}
          />
        )}

        {activePage === 'profile-wizard' && (
          <ProfileWizard
            initialProfile={userProfile}
            onSubmitProfile={handleProfileSubmit}
            onCancel={() => {
              if (userProfile && matchResults.length > 0) {
                handleNavigate('results');
              } else {
                handleNavigate('home');
              }
            }}
          />
        )}

        {activePage === 'processing' && userProfile && (
          <ProcessingScreen
            profile={userProfile}
            onComplete={handleProcessingComplete}
          />
        )}

        {activePage === 'results' && (
          <ResultsDashboard
            profile={userProfile}
            matchResults={matchResults}
            isLoading={isLoadingMatches}
            isError={isErrorMatches}
            onRetry={() => userProfile && loadMatchesForProfile(userProfile)}
            onEditProfile={() => handleNavigate('profile-wizard')}
            onViewSchemeDetails={handleViewSchemeDetails}
            onAskAI={handleAskAI}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'scheme-details' && selectedScheme && (
          <SchemeDetails
            scheme={selectedScheme}
            profile={userProfile}
            onBack={() => {
              if (userProfile) {
                handleNavigate('results');
              } else {
                handleNavigate('explore');
              }
            }}
            onAskAI={handleAskAI}
            onEditProfile={() => handleNavigate('profile-wizard')}
          />
        )}

        {activePage === 'ask-schememate' && (
          <AskSchemeMate
            profile={userProfile}
            activeSchemeContext={assistantSchemeContext}
            onClearActiveSchemeContext={() => setAssistantSchemeContext(null)}
            onViewSchemeDetails={handleViewSchemeDetails}
          />
        )}

        {activePage === 'explore' && (
          <ExploreSchemes
            schemes={schemes}
            profile={userProfile}
            onViewDetails={handleViewSchemeDetails}
            onAskAI={handleAskAI}
            onCreateProfile={() => handleNavigate('profile-wizard')}
          />
        )}

        {activePage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenDisclaimer={() => handleNavigate('about')}
        onOpenPrivacy={() => handleNavigate('about')}
      />
    </div>
  );
}
