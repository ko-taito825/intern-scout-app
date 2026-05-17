export interface InternProfileForm {
  name: string;
  university: string;
  grade: string;
  bio: string;
  github_url: string;
  portfolio_url: string;
}

export interface InternProfileResponse {
  id: number;
  user_id: number;
  name: string;
  university: string;
  grade: string;
  bio: string;
  github_url: string | null;
  portfolio_url: string | null;
  created_at: string;
  updated_at: string;
}
export interface MessageForm {
  body: string;
}

export interface ScoutInboxItem {
  id: number;
  status: string;
  company_name: string;
  latest_message: string;
  created_at: string;
}
