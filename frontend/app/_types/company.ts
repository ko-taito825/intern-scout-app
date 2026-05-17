export interface CompanyProfileFrom {
  name: string;
  industry: string;
  description: string;
  website_url: String;
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
  status: string;
  intern_name: string;
  latest_message: string;
  created_at: string;
}
