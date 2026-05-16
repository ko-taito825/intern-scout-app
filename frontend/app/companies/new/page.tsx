"use client";

import CompanyFrom from "@/app/_components/CompanyFrom";
import { CompanyProfileFrom } from "@/app/_types/company";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const handleCreate = async (data: CompanyProfileFrom) => {
    const res = await fetch("http://localhost:3001/api/company_profiles", {
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
    alert("企業登録が完了しました");
    router.push("/");
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
