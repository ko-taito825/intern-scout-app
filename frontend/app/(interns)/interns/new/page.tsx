"use client";

import ProfileForm from "@/app/_components/ProfileForm";

import { InternProfileForm } from "@/app/_types/Intern";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function page() {
  const router = useRouter();

  const handleCreate = async (data: InternProfileForm) => {
    const payload = {
      ...data,
      user_id: 2,
    };
    try {
      const res = await fetch("http://localhost:3001/api/intern_profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //一旦id=2
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`登録に失敗しました: ${res.status}`);
      }

      toast.success("登録できました");
      router.push("/mypage");
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
