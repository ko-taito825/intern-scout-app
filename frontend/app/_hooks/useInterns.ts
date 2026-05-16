import useSWR, { mutate } from "swr";
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
      alert("登録に失敗しました");
      return;
    }
    alert("登録できました");
    mutate();
  };
  return {
    interns: data,
    isLoading,
    isError: error,
    createIntern,
  };
};
