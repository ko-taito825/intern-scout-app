"use client";

import ProfileForm from "@/app/_components/ProfileForm";
import { useInterns } from "@/app/_hooks/useInterns";
import { InternProfileForm } from "@/app/_types/Intern";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const { createIntern } = useInterns();

  const handleCreate = async (data: InternProfileForm) => {
    try {
      await createIntern(data);
      alert("登録できました");
      router.push("/mypage");
    } catch (error) {
      console.error(error);
      alert("登録に失敗しました");
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
