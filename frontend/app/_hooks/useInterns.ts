import useSWR from "swr";
import { InternProfile, InternProfileForm } from "../_types/Intern";
import { fetcher } from "../_utils/fetcher";

export const useInterns = (query: string = "") => {
  const url = query
    ? `http://localhost:3001/api/intern_profiles?q=${query}`
    : `http://localhost:3001/api/intern_profiles`;
  const { data, error, isLoading, mutate } = useSWR<InternProfile[]>(
    url,
    fetcher,
  );

  const createIntern = async (data: InternProfileForm) => {
    const res = await fetch("http://localhost:3001/api/intern_profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("登録失敗");
    }
    mutate();

    return res.json();
  };
  return {
    interns: data,
    isLoading,
    isError: error,
    createIntern,
  };
};
