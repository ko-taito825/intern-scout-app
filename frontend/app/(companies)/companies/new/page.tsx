"use client";

import CompanyFrom from "@/app/_components/CompanyFrom";
import { CompanyProfileFrom } from "@/app/_types/company";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function page() {
  const router = useRouter();

  const handleCreate = async (data: CompanyProfileFrom) => {
    try {
      const res = await fetch("http://localhost:3001/api/company_profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
          <h1 className="mb-2 text-2xl font-bold text-gray-900">企業登録</h1>
          <p>企業情報を入力してください。</p>
          <CompanyFrom onSubmit={handleCreate} buttonText="登録する" />
        </div>
      </main>
    </>
  );
}
