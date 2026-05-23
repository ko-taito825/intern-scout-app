"use client";

import CompanyFrom from "@/app/_components/CompanyForm";
import {
  CompanyProfileForm,
  CompanyProfileResponse,
} from "@/app/_types/company";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function page() {
  const router = useRouter();
  const [profile, setProfile] = useState<CompanyProfileResponse | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("current_user_id");
      if (!userId) {
        router.push("/companies/new");
        return;
      }
      try {
        const res = await fetch(
          "http://localhost:3001/api/company_profiles/me",
          {
            headers: {
              "Content-Type": "application/json",
              "X-User-Id": userId,
            },
          },
        );
        if (res.ok) {
          const profileData = await res.json();
          setProfile(profileData);
        } else {
          console.error("プロフィールの取得に失敗しました");
        }
      } catch (error) {
        console.error("ネットワークエラーが発生しました", error);
      }
    };
    fetchProfile();
  }, []);
  const handleUpdate = async (data: CompanyProfileForm) => {
    const userId = localStorage.getItem("current_user_id");
    if (!userId || !profile?.id) {
      alert("ログイン状態が確認できません、再度企業としてログインしてください");
      return;
    }
    const res = await fetch(
      `http://localhost:3001/api/company_profiles/${profile.id}`,
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
