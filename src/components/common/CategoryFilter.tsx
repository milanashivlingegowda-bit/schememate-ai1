import React from 'react';
import {
  GraduationCap,
  Sprout,
  Briefcase,
  HeartHandshake,
  Building,
  Home,
  HeartPulse,
  Users2,
  LayoutGrid
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  counts?: Record<string, number>;
}

export const CATEGORIES = [
  { id: 'All', label: 'All Schemes', icon: LayoutGrid },
  { id: 'Education', label: 'Education', icon: GraduationCap },
  { id: 'Agriculture', label: 'Agriculture', icon: Sprout },
  { id: 'Employment', label: 'Employment', icon: Briefcase },
  { id: 'Women', label: 'Women', icon: HeartHandshake },
  { id: 'Business', label: 'Business', icon: Building },
  { id: 'Housing', label: 'Housing', icon: Home },
  { id: 'Healthcare', label: 'Healthcare', icon: HeartPulse },
  { id: 'Social Welfare', label: 'Social Welfare', icon: Users2 }
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  counts
}) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none" id="category-filter-bar">
      <div className="flex items-center gap-2 min-w-max">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
          const count = counts ? counts[cat.id] : undefined;

          return (
            <button
              key={cat.id}
              type="button"
              id={`filter-category-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-600/20'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
              <span>{cat.label}</span>
              {count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none ${
                    isSelected
                      ? 'bg-indigo-700/80 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
