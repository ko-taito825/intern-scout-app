"use client";

import ProfileForm from "@/app/_components/ProfileForm";
import { InternProfileForm } from "@/app/_types/Intern";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const router = useRouter();
  const [profile, setProfile] = useState<InternProfileForm | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("http://localhost:3001/api/intern_profiles/me");
      if (res.ok) {
        const profileData = await res.json();
        setProfile(profileData);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdata = async (data: InternProfileForm) => {
    const res = await fetch("http://localhost:3001/api/intern_profiles/2", {
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
    router.push("/mypage");
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            インターン生登録（編集）
          </h1>
          <p>プロフィール情報を編集してください</p>
          <ProfileForm
            onSubmit={handleUpdata}
            buttonText="更新する"
            defaultValues={profile}
          />
        </div>
      </main>
    </>
  );
}
