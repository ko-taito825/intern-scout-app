import { CompanyProfileResponse } from "./company";

export interface JobResponse {
  id: number;
  company_profile_id: number;
  content: string;
  requirements: string;
  work_style: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  company_profile: CompanyProfileResponse;
}

export interface ApplyForm {
  message: string;
}

export interface JobProfileForm {
  title: string;
  content: string;
  requirements: string;
  work_style: string;
}

export interface JobPosting {
  id: number;
  title: string;
  content: string;
  work_style: string;
  company_profile: {
    id: number;
    name: string;
  };
}
