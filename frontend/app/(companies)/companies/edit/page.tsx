"use client";

import CompanyFrom from "@/app/_components/CompanyForm";
import { useFetch } from "@/app/_hooks/useFetch";
import {
  CompanyProfileForm,
  CompanyProfileResponse,
} from "@/app/_types/company";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function page() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("current_user_id");
    if (!id) router.push("/companies/new");
    else setUserId(id);
  }, []);
  const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const headers = userId ? { "X-User-Id": userId } : null;
  const { data: profile, isLoading } = useFetch<CompanyProfileResponse>(
    userId ? `${BASE}/api/companies/${userId}` : null,
    headers,
  );

  const handleUpdate = async (data: CompanyProfileForm) => {
    const userId = localStorage.getItem("current_user_id");
    if (!userId || !profile?.id) {
      toast.error("ログイン状態が確認できません、再度企業としてログインしてください");
      return;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/company_profiles/${profile.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": userId,
        },
        body: JSON.stringify(data),
      },
    );
    if (!res.ok) {
      toast.error("更新に失敗しました");
      return;
    }
    toast.success("プロフィールを更新できました");
    router.push("/companies/mypage");
  };
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center font-bold text-zinc-500">
        Loading...
      </div>
    );
  }
  return (
    <>
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">企業登録</h1>
          <p>企業情報を入力してください。</p>
          <CompanyFrom
            onSubmit={handleUpdate}
            buttonText="更新する"
            defaultValues={
              profile
                ? {
                    name: profile.name,
                    industry: profile.industry,
                    description: profile.description,
                    website_url: profile.website_url || "",
                  }
                : undefined
            }
          />
        </div>
      </main>
    </>
  );
}
