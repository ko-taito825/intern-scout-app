import useSWR from "swr";
import { InternProfile } from "../_types/Intern";
import { fetcher } from "../_utils/fetcher";
export const useInterns = (query: string = "") => {
  const url = query
    ? `http://localhost:3001/api/companies?q=${query}`
    : `http://localhost:3001/api/companies`;
  const { data, error, isLoading } = useSWR<InternProfile[]>(url, fetcher);

  return {
    interns: data,
    isLoading,
    isError: error,
  };
};
