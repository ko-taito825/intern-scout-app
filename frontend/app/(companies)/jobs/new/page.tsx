"use client";

import JobForm from "@/app/_components/JobForm";
import { JobProfileForm } from "@/app/_types/job";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function page() {
  const router = useRouter();

  const handleCreate = async (data: JobProfileForm) => {
    try {
      const res = await fetch("http://localhost:3001/api/jobs", {
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
      router.push("/jobs");
    } catch (error) {
      console.error(error);
      toast.error("登録に失敗しました");
    }
  };
  return (
    <>
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            新規募集の作成
          </h1>
          <p className="mb-6 text-gray-600">
            インターン生に向けて、魅力的な募集内容を記入しましょう。
          </p>

          <JobForm onSubmit={handleCreate} buttonText="登録する" />
        </div>
      </main>
    </>
  );
}
