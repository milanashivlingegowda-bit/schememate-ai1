import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Info,
  User,
  Briefcase,
  Coins,
  SlidersHorizontal
} from 'lucide-react';
import { UserProfile, GenderType, EmploymentStatus, IncomeRange, SocialCategory, ResidenceType } from '../../types/scheme';
import { INDIAN_STATES_DISTRICTS } from '../../data/demoSchemes';
import { Button } from '../common/Button';
import { FormField } from '../common/FormField';
import { ProgressIndicator } from '../common/ProgressIndicator';

interface ProfileWizardProps {
  initialProfile: UserProfile | null;
  onSubmitProfile: (profile: UserProfile) => void;
  onCancel: () => void;
}

const WIZARD_STEPS = [
  { number: 1, title: 'Basic Information', shortTitle: 'Basic' },
  { number: 2, title: 'Personal & Occupation', shortTitle: 'Personal' },
  { number: 3, title: 'Financial & Household', shortTitle: 'Financial' },
  { number: 4, title: 'Specific Categories', shortTitle: 'Specifics' }
];

export const ProfileWizard: React.FC<ProfileWizardProps> = ({
  initialProfile,
  onSubmitProfile,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [profile, setProfile] = useState<UserProfile>(() => {
    return (
      initialProfile || {
        age: 26,
        state: 'Karnataka',
        district: 'Bengaluru Urban',
        gender: 'female',
        occupation: 'Software Student / Trainee',
        employmentStatus: 'student',
        isStudent: true,
        annualIncomeRange: '1_5_to_3_lakh',
        socialCategory: 'OBC',
        residenceType: 'Urban',
        isFarmer: false,
        isPersonWithDisability: false,
        isSeniorCitizen: false,
        hasBusinessOwnership: false
      }
    );
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // District options based on chosen state
  const availableDistricts = profile.state && INDIAN_STATES_DISTRICTS[profile.state]
    ? INDIAN_STATES_DISTRICTS[profile.state]
    : [];

  const handleStateChange = (selectedState: string) => {
    const districts = INDIAN_STATES_DISTRICTS[selectedState] || [];
    setProfile(prev => ({
      ...prev,
      state: selectedState,
      district: districts.length > 0 ? districts[0] : ''
    }));
  };

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!profile.age || profile.age < 1 || profile.age > 120) {
        newErrors.age = 'Please enter a valid age between 1 and 120 years.';
      }
      if (!profile.state) {
        newErrors.state = 'Please select your state of residence.';
      }
      if (!profile.district) {
        newErrors.district = 'Please select your district.';
      }
    }

    if (stepNumber === 2) {
      if (!profile.gender) {
        newErrors.gender = 'Please select your gender identification.';
      }
      if (!profile.employmentStatus) {
        newErrors.employmentStatus = 'Please select your current employment status.';
      }
    }

    if (stepNumber === 3) {
      if (!profile.annualIncomeRange) {
        newErrors.annualIncomeRange = 'Please select an approximate annual household income tier.';
      }
      if (!profile.socialCategory) {
        newErrors.socialCategory = 'Please specify your social/economic category.';
      }
      if (!profile.residenceType) {
        newErrors.residenceType = 'Please select whether you reside in a Rural or Urban area.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Step 4 final submission
        onSubmitProfile(profile);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onCancel();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8" id="profile-wizard-page">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demographic Profile Wizard</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Create Your Citizen Profile
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Provide basic signals to let SchemeMate AI identify schemes you may qualify for.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="leading-tight">
              Privacy First: Never asks for Aadhaar or Bank details.
            </span>
          </div>
        </div>

        {/* Stepper Progress */}
        <div className="pt-6">
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={4}
            steps={WIZARD_STEPS}
            onStepClick={(step) => {
              if (step < currentStep) setCurrentStep(step);
            }}
          />
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
        {/* STEP 1: BASIC INFORMATION */}
        {currentStep === 1 && (
          <div className="space-y-6" id="wizard-step-1-content">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900">Step 1 — Basic Information</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Age and regional jurisdiction help filter central versus state-specific entitlements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age */}
              <FormField
                id="profile-age"
                label="Age (in years)"
                description="Certain welfare programs target youth, working adults, or senior citizens."
                required
                error={errors.age}
              >
                <input
                  type="number"
                  id="profile-age"
                  min="1"
                  max="120"
                  value={profile.age ?? ''}
                  onChange={(e) => {
                    const val = e.target.value === '' ? null : parseInt(e.target.value, 10);
                    setProfile(prev => ({
                      ...prev,
                      age: val,
                      isSeniorCitizen: val !== null && val >= 60 ? true : prev.isSeniorCitizen
                    }));
                  }}
                  placeholder="e.g. 28"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 shadow-2xs"
                />
              </FormField>

              {/* State */}
              <FormField
                id="profile-state"
                label="State / Union Territory"
                description="Enables identification of regional welfare initiatives and state quotas."
                required
                error={errors.state}
              >
                <select
                  id="profile-state"
                  value={profile.state}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 shadow-2xs"
                >
                  <option value="">Select your state</option>
                  {Object.keys(INDIAN_STATES_DISTRICTS).map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            {/* District */}
            <FormField
              id="profile-district"
              label="District"
              description="Nodal administrative district for municipal or gram panchayat verification."
              required
              error={errors.district}
            >
              <select
                id="profile-district"
                value={profile.district}
                onChange={(e) => setProfile(prev => ({ ...prev, district: e.target.value }))}
                disabled={!profile.state}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 shadow-2xs disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="">Select district</option>
                {availableDistricts.map((dst) => (
                  <option key={dst} value={dst}>
                    {dst}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        )}

        {/* STEP 2: PERSONAL & OCCUPATION */}
        {currentStep === 2 && (
          <div className="space-y-6" id="wizard-step-2-content">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Personal & Occupation</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Helps identify women-specific, student scholarship, and livelihood enhancement programs.
              </p>
            </div>

            {/* Gender Selection */}
            <FormField
              id="profile-gender"
              label="Gender"
              description="Schemes like Lakhpati Didi or Sukanya Samriddhi are targeted for women."
              required
              error={errors.gender}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'female', label: 'Female' },
                  { id: 'male', label: 'Male' },
                  { id: 'transgender', label: 'Transgender' },
                  { id: 'prefer_not_to_say', label: 'Prefer not to say' }
                ].map((g) => (
                  <label
                    key={g.id}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      profile.gender === g.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g.id}
                      checked={profile.gender === g.id}
                      onChange={() => setProfile(prev => ({ ...prev, gender: g.id as GenderType }))}
                      className="sr-only"
                    />
                    <span className="w-3.5 h-3.5 rounded-full border flex items-center justify-center border-slate-300">
                      {profile.gender === g.id && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                    </span>
                    <span>{g.label}</span>
                  </label>
                ))}
              </div>
            </FormField>

            {/* Employment Status */}
            <FormField
              id="profile-employment"
              label="Employment Status"
              description="Select your current primary occupation status."
              required
              error={errors.employmentStatus}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'student', label: 'Student / Scholar' },
                  { id: 'self_employed', label: 'Self-Employed / Business' },
                  { id: 'daily_wage', label: 'Daily Wage / Gig Worker' },
                  { id: 'employed', label: 'Salaried Employee' },
                  { id: 'unemployed', label: 'Unemployed / Job Seeker' },
                  { id: 'homemaker', label: 'Homemaker' }
                ].map((emp) => (
                  <label
                    key={emp.id}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      profile.employmentStatus === emp.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="employmentStatus"
                      value={emp.id}
                      checked={profile.employmentStatus === emp.id}
                      onChange={() =>
                        setProfile(prev => ({
                          ...prev,
                          employmentStatus: emp.id as EmploymentStatus,
                          isStudent: emp.id === 'student' ? true : prev.isStudent
                        }))
                      }
                      className="sr-only"
                    />
                    <span className="w-3.5 h-3.5 rounded-full border flex items-center justify-center border-slate-300">
                      {profile.employmentStatus === emp.id && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      )}
                    </span>
                    <span>{emp.label}</span>
                  </label>
                ))}
              </div>
            </FormField>

            {/* Occupation details */}
            <FormField
              id="profile-occupation-text"
              label="Specific Occupation Title (Optional)"
              description="e.g. Small Farmer, ITI Electrician, College Student, Tailor, Retail Store Owner"
            >
              <input
                type="text"
                id="profile-occupation-text"
                value={profile.occupation}
                onChange={(e) => setProfile(prev => ({ ...prev, occupation: e.target.value }))}
                placeholder="e.g. Small Land Farmer / College Student"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 shadow-2xs"
              />
            </FormField>

            {/* Is Student Toggle */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-slate-900 block">
                  Currently enrolled as a student?
                </span>
                <span className="text-xs text-slate-500">
                  Activates higher education scholarships, tuition waivers, and fee reimbursements.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="profile-is-student-toggle"
                  checked={profile.isStudent}
                  onChange={(e) => setProfile(prev => ({ ...prev, isStudent: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
              </label>
            </div>
          </div>
        )}

        {/* STEP 3: FINANCIAL & HOUSEHOLD */}
        {currentStep === 3 && (
          <div className="space-y-6" id="wizard-step-3-content">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900">Step 3 — Financial & Household</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Income thresholds and social categories govern most subsidy benefits and quotas.
              </p>
            </div>

            {/* Annual Household Income */}
            <FormField
              id="profile-income"
              label="Approximate Annual Household Income"
              description="Combined total income of your family before taxes."
              required
              error={errors.annualIncomeRange}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'under_1_5_lakh', label: 'Under ₹1.5 Lakh / year', desc: 'BPL / Priority Household' },
                  { id: '1_5_to_3_lakh', label: '₹1.5 Lakh - ₹3 Lakh / year', desc: 'Lower Income Group (LIG)' },
                  { id: '3_to_5_lakh', label: '₹3 Lakh - ₹5 Lakh / year', desc: 'Middle Income Tier' },
                  { id: '5_to_8_lakh', label: '₹5 Lakh - ₹8 Lakh / year', desc: 'Moderate Income Tier' },
                  { id: 'above_8_lakh', label: 'Above ₹8 Lakh / year', desc: 'General Non-Subsidized' }
                ].map((inc) => (
                  <label
                    key={inc.id}
                    className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                      profile.annualIncomeRange === inc.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{inc.label}</span>
                      <input
                        type="radio"
                        name="income"
                        value={inc.id}
                        checked={profile.annualIncomeRange === inc.id}
                        onChange={() =>
                          setProfile(prev => ({ ...prev, annualIncomeRange: inc.id as IncomeRange }))
                        }
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 mt-0.5">{inc.desc}</span>
                  </label>
                ))}
              </div>
            </FormField>

            {/* Social Category */}
            <FormField
              id="profile-social-cat"
              label="Social / Economic Category"
              description="Certain scholarships, business subsidies, and welfare quotas have specific reservation allocations."
              required
              error={errors.socialCategory}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'General', label: 'General' },
                  { id: 'OBC', label: 'OBC (Other Backward Classes)' },
                  { id: 'SC', label: 'SC (Scheduled Caste)' },
                  { id: 'ST', label: 'ST (Scheduled Tribe)' },
                  { id: 'EWS', label: 'EWS (Economically Weaker Section)' },
                  { id: 'Minority', label: 'Religious / Linguistic Minority' }
                ].map((sc) => (
                  <label
                    key={sc.id}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      profile.socialCategory === sc.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="socialCategory"
                      value={sc.id}
                      checked={profile.socialCategory === sc.id}
                      onChange={() =>
                        setProfile(prev => ({ ...prev, socialCategory: sc.id as SocialCategory }))
                      }
                      className="sr-only"
                    />
                    <span className="w-3.5 h-3.5 rounded-full border flex items-center justify-center border-slate-300">
                      {profile.socialCategory === sc.id && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      )}
                    </span>
                    <span className="truncate">{sc.label}</span>
                  </label>
                ))}
              </div>
            </FormField>

            {/* Residence Type */}
            <FormField
              id="profile-residence"
              label="Area of Residence"
              description="Determines eligibility for rural development (MGNREGA/DAY-NRLM) vs urban housing missions."
              required
              error={errors.residenceType}
            >
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'Rural', label: 'Rural (Village)' },
                  { id: 'Urban', label: 'Urban (City/Town)' },
                  { id: 'Semi-Urban', label: 'Semi-Urban' }
                ].map((res) => (
                  <label
                    key={res.id}
                    className={`flex items-center justify-center p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all text-center ${
                      profile.residenceType === res.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="residenceType"
                      value={res.id}
                      checked={profile.residenceType === res.id}
                      onChange={() =>
                        setProfile(prev => ({ ...prev, residenceType: res.id as ResidenceType }))
                      }
                      className="sr-only"
                    />
                    <span>{res.label}</span>
                  </label>
                ))}
              </div>
            </FormField>
          </div>
        )}

        {/* STEP 4: ADDITIONAL & SPECIAL CRITERIA */}
        {currentStep === 4 && (
          <div className="space-y-6" id="wizard-step-4-content">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900">Step 4 — Specific Categories</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Enable tailored matching for agriculture, disability aids, pensions, or entrepreneurship grants.
              </p>
            </div>

            <div className="space-y-4">
              {/* Farmer Toggle */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-50/80 transition-colors">
                <div className="pr-4">
                  <span className="text-sm font-bold text-slate-900 block">
                    Are you or your family involved in farming / land cultivation?
                  </span>
                  <span className="text-xs text-slate-500">
                    Unlocks agricultural income support (PM-KISAN), crop insurance, and Kisan credit cards.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    id="profile-is-farmer-toggle"
                    checked={profile.isFarmer}
                    onChange={(e) => setProfile(prev => ({ ...prev, isFarmer: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                </label>
              </div>

              {/* Disability Status */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-50/80 transition-colors">
                <div className="pr-4">
                  <span className="text-sm font-bold text-slate-900 block">
                    Person with Disability (Divyangjan / PwD)?
                  </span>
                  <span className="text-xs text-slate-500">
                    Matches with assistive aids (ADIP scheme), specialized scholarships, and transport concessions.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    id="profile-is-pwd-toggle"
                    checked={profile.isPersonWithDisability}
                    onChange={(e) =>
                      setProfile(prev => ({ ...prev, isPersonWithDisability: e.target.checked }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                </label>
              </div>

              {/* Senior Citizen Status */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-50/80 transition-colors">
                <div className="pr-4">
                  <span className="text-sm font-bold text-slate-900 block">
                    Senior Citizen (Aged 60 and above)?
                  </span>
                  <span className="text-xs text-slate-500">
                    Enables monthly social security pension (NSAP) and senior health coverage (Ayushman Vay Vandana).
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    id="profile-is-senior-toggle"
                    checked={profile.isSeniorCitizen || (profile.age !== null && profile.age >= 60)}
                    onChange={(e) =>
                      setProfile(prev => ({ ...prev, isSeniorCitizen: e.target.checked }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                </label>
              </div>

              {/* Business Ownership */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-50/80 transition-colors">
                <div className="pr-4">
                  <span className="text-sm font-bold text-slate-900 block">
                    Own a micro-enterprise or looking to start a new business?
                  </span>
                  <span className="text-xs text-slate-500">
                    Matches with MSME credit subsidies (PMEGP), Stand-Up India, and Mudra credit lines.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    id="profile-has-business-toggle"
                    checked={profile.hasBusinessOwnership}
                    onChange={(e) =>
                      setProfile(prev => ({ ...prev, hasBusinessOwnership: e.target.checked }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                </label>
              </div>
            </div>

            {/* Privacy Guarantee Reminder */}
            <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3 text-xs text-indigo-950">
              <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Data Handling Guarantee:</strong> Your profile answers are stored locally in application state
                during this session. No personal identifiers or biometric registries are queried.
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <Button
            id="wizard-back-btn"
            variant="secondary"
            onClick={handleBack}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>

          <Button
            id="wizard-continue-btn"
            variant="primary"
            onClick={handleNext}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            {currentStep === 4 ? 'Find My Schemes' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};
