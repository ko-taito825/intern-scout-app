export interface InternProfileForm {
  name: string;
  university: string;
  grade: string;
  bio: string;
  github_url: string;
  portfolio_url: string;
}

export interface InternProfile {
  id: number;
  user_id: number;
  name: string;
  university: string;
  grade: string;
  bio: string;
  github_url: string;
  portfolio_url: string;
  created_at: string;
  updated_at: string;
}
export interface MessageForm {
  body: string;
}
