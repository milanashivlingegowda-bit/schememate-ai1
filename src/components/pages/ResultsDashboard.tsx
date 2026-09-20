import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Layers,
  ShieldAlert,
  ArrowUpDown,
  Filter,
  CheckCircle2,
  SlidersHorizontal,
  MessageSquare,
  RefreshCw,
  Search,
  ExternalLink,
  Info
} from 'lucide-react';
import { UserProfile, SchemeMatchResult, SchemeCategory, ActivePage } from '../../types/scheme';
import { SchemeCard } from '../common/SchemeCard';
import { CategoryFilter } from '../common/CategoryFilter';
import { ProfileSummary } from '../common/ProfileSummary';
import { LoadingState, EmptyState, ErrorState } from '../common/States';
import { Button } from '../common/Button';
import { calculateProfileCompleteness } from '../../services/matchingEngine';

interface ResultsDashboardProps {
  profile: UserProfile | null;
  matchResults: SchemeMatchResult[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onEditProfile: () => void;
  onViewSchemeDetails: (schemeId: string) => void;
  onAskAI: (schemeId?: string) => void;
  onNavigate: (page: ActivePage) => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  profile,
  matchResults,
  isLoading,
  isError,
  onRetry,
  onEditProfile,
  onViewSchemeDetails,
  onAskAI,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'highest-match' | 'category'>('highest-match');
  const [searchQuery, setSearchQuery] = useState('');

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: matchResults.length };
    matchResults.forEach((res) => {
      const cat = res.scheme.category;
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [matchResults]);

  // Unique categories count represented in matches
  const uniqueCategoriesCount = useMemo(() => {
    const set = new Set(matchResults.map(r => r.scheme.category));
    return set.size;
  }, [matchResults]);

  // Profile completeness percentage
  const completeness = useMemo(() => {
    return calculateProfileCompleteness(profile);
  }, [profile]);

  // Filter & Sort
  const filteredAndSortedMatches = useMemo(() => {
    let list = [...matchResults];

    // Category filter
    if (selectedCategory !== 'All') {
      list = list.filter(
        (item) => item.scheme.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.scheme.name.toLowerCase().includes(q) ||
          item.scheme.shortDescription.toLowerCase().includes(q) ||
          item.scheme.benefits.summary.toLowerCase().includes(q) ||
          item.matchedReasons.some((r) => r.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'highest-match') {
      list.sort((a, b) => b.matchPercentage - a.matchPercentage);
    } else if (sortBy === 'relevance') {
      // Relevance prefers high percentage + match tier
      list.sort((a, b) => {
        if (b.matchPercentage !== a.matchPercentage) {
          return b.matchPercentage - a.matchPercentage;
        }
        return a.scheme.name.localeCompare(b.scheme.name);
      });
    } else if (sortBy === 'category') {
      list.sort((a, b) => a.scheme.category.localeCompare(b.scheme.category));
    }

    return list;
  }, [matchResults, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="results-dashboard-page">
      {/* Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Matching Evaluation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Your Potential Scheme Matches
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            These results are based on the profile information you provided.
          </p>
        </div>

        {/* Ask Assistant CTA */}
        <div className="flex items-center gap-2">
          <Button
            id="results-ask-ai-btn"
            variant="outline"
            size="sm"
            onClick={() => onAskAI()}
            icon={<MessageSquare className="w-4 h-4 text-indigo-600" />}
          >
            Ask SchemeMate AI
          </Button>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-bold">Demo data — official verification required:</strong> The schemes and match
          percentages presented below are computed for prototype evaluation. Always verify your eligibility,
          cut-off criteria, and official submission guidelines on official government portals before applying.
        </div>
      </div>

      {/* Summary Cards Row (3 Cards: Potential Matches, Categories, Profile Completeness) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5" id="summary-metrics-row">
        {/* Card 1: Potential Matches */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Potential Matches</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5 block">
              {matchResults.length}
            </span>
            <span className="text-[11px] font-medium text-emerald-600 mt-1 block">
              {matchResults.filter((m) => m.matchPercentage >= 80).length} High Affinity Schemes
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Categories Represented */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Sectors & Categories</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5 block">
              {uniqueCategoriesCount}
            </span>
            <span className="text-[11px] font-medium text-indigo-600 mt-1 block">
              Across Agriculture, Education, Healthcare
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Profile Completeness */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Profile Completeness</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5 block">
              {completeness}%
            </span>
            <button
              type="button"
              id="modify-profile-link"
              onClick={onEditProfile}
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 underline mt-1 block cursor-pointer"
            >
              Update Profile Signals
            </button>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Active Profile Summary Component */}
      <ProfileSummary profile={profile} onEdit={onEditProfile} />

      {/* Controls: Category Filter, Search & Sort */}
      <div className="space-y-4">
        {/* Category Pills */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          counts={categoryCounts}
        />

        {/* Search & Sort Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {/* Quick search input */}
          <div className="w-full sm:w-80">
            <input
              type="text"
              id="results-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search matched schemes or reasons..."
              className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 shadow-2xs"
            />
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort by:
            </span>
            <select
              id="results-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 shadow-2xs"
            >
              <option value="highest-match">Highest Profile Match</option>
              <option value="relevance">Most Relevant</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content State Rendering */}
      {isLoading ? (
        <LoadingState
          message="Re-evaluating eligibility matches..."
          subtext="Scanning database criteria against updated citizen parameters"
        />
      ) : isError ? (
        <ErrorState onRetry={onRetry} />
      ) : filteredAndSortedMatches.length === 0 ? (
        <EmptyState
          title="No matching schemes in this filter"
          description={`No schemes match your filter "${selectedCategory}" with current search criteria.`}
          actionText="Show All Categories"
          onAction={() => {
            setSelectedCategory('All');
            setSearchQuery('');
          }}
          secondaryActionText="Adjust Profile"
          onSecondaryAction={onEditProfile}
        />
      ) : (
        /* Scheme Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="matched-schemes-grid">
          {filteredAndSortedMatches.map((matchItem) => (
            <SchemeCard
              key={matchItem.scheme.id}
              scheme={matchItem.scheme}
              matchResult={matchItem}
              onViewDetails={onViewSchemeDetails}
              onAskAI={() => onAskAI(matchItem.scheme.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
