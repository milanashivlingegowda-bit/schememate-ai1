import React, { useState, useMemo } from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Filter,
  Layers,
  Search,
  Building2,
  UserPlus,
  ShieldAlert
} from 'lucide-react';
import { DemoScheme, UserProfile } from '../../types/scheme';
import { calculateSchemeMatch } from '../../services/matchingEngine';
import { SchemeCard } from '../common/SchemeCard';
import { CategoryFilter } from '../common/CategoryFilter';
import { SearchBar } from '../common/SearchBar';
import { EmptyState } from '../common/States';
import { Button } from '../common/Button';

interface ExploreSchemesProps {
  schemes: DemoScheme[];
  profile: UserProfile | null;
  onViewDetails: (schemeId: string) => void;
  onAskAI: (schemeId: string) => void;
  onCreateProfile: () => void;
}

export const ExploreSchemes: React.FC<ExploreSchemesProps> = ({
  schemes,
  profile,
  onViewDetails,
  onAskAI,
  onCreateProfile
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');

  // Compute available departments
  const departments = useMemo(() => {
    const set = new Set<string>();
    schemes.forEach((s) => set.add(s.department));
    return ['All', ...Array.from(set)];
  }, [schemes]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: schemes.length };
    schemes.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, [schemes]);

  // Filter schemes
  const filteredSchemes = useMemo(() => {
    return schemes.filter((s) => {
      // Category filter
      if (
        selectedCategory !== 'All' &&
        s.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // Department filter
      if (
        selectedDepartment !== 'All' &&
        s.department.toLowerCase() !== selectedDepartment.toLowerCase()
      ) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = s.name.toLowerCase().includes(q);
        const matchesDesc = s.shortDescription.toLowerCase().includes(q);
        const matchesBenefit = s.benefits.summary.toLowerCase().includes(q);
        const matchesCriteria = s.eligibility.criteriaList.some((c) =>
          c.toLowerCase().includes(q)
        );
        const matchesDocs = s.documents.some((d) => d.toLowerCase().includes(q));

        if (!matchesName && !matchesDesc && !matchesBenefit && !matchesCriteria && !matchesDocs) {
          return false;
        }
      }

      return true;
    });
  }, [schemes, selectedCategory, selectedDepartment, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="explore-schemes-page">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Public Welfare Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Government Schemes
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Browse our full catalogue of demo central and state welfare initiatives across agriculture,
            education, business, and health.
          </p>
        </div>

        {!profile ? (
          <Button
            id="explore-create-profile-btn"
            variant="primary"
            size="sm"
            onClick={onCreateProfile}
            icon={<UserPlus className="w-4 h-4" />}
          >
            Create Profile to Match
          </Button>
        ) : (
          <div className="inline-flex items-center gap-2 p-2 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Personalized Match Scores Active</span>
          </div>
        )}
      </div>

      {/* Mandatory Notice */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0" />
          <span>Demo Data Prototype • Showing {filteredSchemes.length} of {schemes.length} schemes</span>
        </div>
        {!profile && (
          <button
            type="button"
            onClick={onCreateProfile}
            className="text-indigo-600 hover:text-indigo-800 font-bold underline cursor-pointer text-xs"
          >
            Match against my profile →
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Category horizontal scrolling bar */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          counts={categoryCounts}
        />

        {/* Search & Department Selector */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by scheme name, keywords, benefits, documents..."
            />
          </div>

          {/* Department Filter */}
          <div className="w-full sm:w-72 flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium shrink-0 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> Dept:
            </span>
            <select
              id="department-filter-select"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 shadow-2xs"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'All' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Scheme Cards Grid */}
      {filteredSchemes.length === 0 ? (
        <EmptyState
          title="No schemes match your query"
          description={`No schemes found for "${searchQuery}" under ${selectedCategory}. Try resetting filters.`}
          actionText="Reset All Filters"
          onAction={() => {
            setSelectedCategory('All');
            setSelectedDepartment('All');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="explore-schemes-grid">
          {filteredSchemes.map((scheme) => {
            const matchResult = profile ? calculateSchemeMatch(scheme, profile) : undefined;

            return (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                matchResult={matchResult}
                onViewDetails={onViewDetails}
                onAskAI={onAskAI}
                showMatchBadge={!!profile}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
