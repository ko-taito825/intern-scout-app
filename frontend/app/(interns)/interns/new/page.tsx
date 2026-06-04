"use client";

import ProfileForm from "@/app/_components/ProfileForm";
import { InternProfileForm } from "@/app/_types/Intern";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function page() {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("current_user_id");
    const role = localStorage.getItem("current_role");
    if (userId && role === "intern") {
      router.push("/interns/mypage");
    }
  }, [router]);
  const handleCreate = async (data: InternProfileForm) => {
    try {
      const res = await fetch(
        (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000") +
          "/api/intern_profiles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        },
      );
      if (!res.ok) {
        throw new Error(`登録に失敗しました: ${res.status}`);
      }
      const newProfile = await res.json();
      if (newProfile && newProfile.user_id) {
        localStorage.setItem("current_user_id", String(newProfile.user_id));
        localStorage.setItem("current_role", "intern");
      }
      toast.success("登録できました");
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
            インターン生登録
          </h1>
          <p>プロフィール情報を入力してください。</p>
          <ProfileForm onSubmit={handleCreate} buttonText="登録する" />
        </div>
      </main>
    </>
  );
}
