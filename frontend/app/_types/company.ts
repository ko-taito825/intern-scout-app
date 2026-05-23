export interface CompanyProfileForm {
  name: string;
  industry: string;
  description: string;
  website_url: string;
}

export interface CompanyProfileResponse {
  id: number;
  user_id: number;
  name: string;
  industry: string;
  description: string;
  website_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface SentScoutItem {
  id: number;
  intern_profile_id: number;
  status: string;
  intern_name: string;
  latest_message: string;
  created_at: string;
}

export interface AppliedEntry {
  id: number;
  message: string;
  job_title: string;
  applicant_name: string;
  applicant_id: number;
  created_at: string;
}
