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
