import React from 'react';
import { User, MapPin, Briefcase, Coins, ShieldCheck, Edit3 } from 'lucide-react';
import { UserProfile } from '../../types/scheme';
import { calculateProfileCompleteness } from '../../services/matchingEngine';

interface ProfileSummaryProps {
  profile: UserProfile | null;
  onEdit: () => void;
  className?: string;
}

const INCOME_LABELS: Record<string, string> = {
  under_1_5_lakh: '< ₹1.5 Lakh/yr',
  '1_5_to_3_lakh': '₹1.5 - ₹3 Lakh/yr',
  '3_to_5_lakh': '₹3 - ₹5 Lakh/yr',
  '5_to_8_lakh': '₹5 - ₹8 Lakh/yr',
  above_8_lakh: '> ₹8 Lakh/yr'
};

export const ProfileSummary: React.FC<ProfileSummaryProps> = ({
  profile,
  onEdit,
  className = ''
}) => {
  if (!profile) {
    return (
      <div className={`p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between ${className}`} id="profile-summary-empty">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-800">Guest Citizen Profile</h4>
            <p className="text-xs text-slate-500">Complete your profile to unlock precision match scoring</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-white border border-indigo-200 px-3 py-1.5 rounded-lg shadow-2xs hover:bg-indigo-50 cursor-pointer"
        >
          Build Profile
        </button>
      </div>
    );
  }

  const completeness = calculateProfileCompleteness(profile);

  return (
    <div className={`bg-white border border-slate-200/90 rounded-2xl p-4 md:p-5 shadow-xs ${className}`} id="active-profile-summary">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
            {profile.gender === 'female' ? 'F' : profile.gender === 'male' ? 'M' : 'C'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900">Your Active Profile</h4>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                <ShieldCheck className="w-3 h-3" /> {completeness}% Complete
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Demographic signals used for tailored welfare matching
            </p>
          </div>
        </div>

        <button
          type="button"
          id="edit-profile-btn"
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 self-start md:self-auto text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Profile Attribute Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3.5 text-xs">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100/80">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate text-slate-700 font-medium">
            {profile.state ? `${profile.district || profile.state}` : 'State: Not set'}
          </span>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100/80">
          <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate text-slate-700 font-medium capitalize">
            {profile.isFarmer
              ? 'Farmer / Cultivator'
              : profile.isStudent
              ? 'Student'
              : profile.occupation || profile.employmentStatus || 'Occupation: General'}
          </span>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100/80">
          <Coins className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate text-slate-700 font-medium">
            {profile.annualIncomeRange ? INCOME_LABELS[profile.annualIncomeRange] : 'Income: Any'}
          </span>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100/80">
          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate text-slate-700 font-medium">
            {profile.age ? `${profile.age} yrs` : 'Age: N/A'} • {profile.socialCategory || 'Gen'}
          </span>
        </div>
      </div>
    </div>
  );
};
