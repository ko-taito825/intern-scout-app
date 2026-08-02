"use client";

import ProfileForm from "@/app/_components/ProfileForm";
import { InternProfileForm } from "@/app/_types/Intern";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function page() {
  const router = useRouter();
  const [profile, setProfile] = useState<InternProfileForm | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("current_user_id");
      try {
        const res = await fetch(
          (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000") +
            "/api/intern_profiles/me",
          {
            headers: {
              "Content-Type": "application/json",
              "X-User-Id": userId || "",
            },
          },
        );
        if (!res.ok) {
          throw new Error("プロフィールの取得に失敗しました");
        }
        const profileData = await res.json();
        setProfile(profileData);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
        toast.error(
          "プロフィールの取得に失敗しました。画面をリロードしてください。",
        );
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (data: InternProfileForm) => {
    try {
      const userId = localStorage.getItem("current_user_id");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/intern_profiles/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-User-Id": userId || "",
          },
          body: JSON.stringify(data),
        },
      );
      if (!res.ok) {
        throw new Error("更新に失敗しました");
      }
      toast.success("プロフィールを更新しました！");
      router.push("/interns/mypage");
    } catch (error) {
      console.error(error);
      toast.error("通信エラーが発生しました");
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            インターン生登録（編集）
          </h1>
          <p className="mb-6 text-gray-600">
            プロフィール情報を編集してください
          </p>
          <ProfileForm
            onSubmit={handleUpdate}
            buttonText="更新する"
            defaultValues={profile}
          />
        </div>
      </main>
    </>
  );
}
