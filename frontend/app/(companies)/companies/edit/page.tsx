"use client";

import CompanyFrom from "@/app/_components/CompanyFrom";
import { CompanyProfileFrom } from "@/app/_types/company";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const router = useRouter();
  const [profile, setProfile] = useState<CompanyProfileFrom | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("http://localhost:3001/api/company_profiles/1");
      if (res.ok) {
        const profileData = await res.json();
        setProfile(profileData);
      }
    };
    fetchProfile();
  }, []);
  const handleUpdate = async (data: CompanyProfileFrom) => {
    const res = await fetch("http://localhost:3001/api/company_profiles/1", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      alert("更新に失敗しました");
      return;
    }
    alert("プロフィールを更新できました");
    router.push("/");
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
            defaultValues={profile}
          />
        </div>
      </main>
    </>
  );
}
