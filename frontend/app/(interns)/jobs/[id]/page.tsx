"use client";
import Link from "next/link";
import { ApplyForm, JobResponse } from "@/app/_types/job";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import JobDetailCard from "@/app/_components/JobDetailCard";

export default function page() {
  const params = useParams();
  const id = params.id;
  const [job, setJob] = useState<JobResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ApplyForm>();

  const fetchJob = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/jobs/${id}`);
      if (!res.ok) {
        throw new Error("API通信に失敗しました");
      }
      const data: JobResponse = await res.json();
      setJob(data);
    } catch (error) {
      console.error(error);
      toast.error("求人の詳細の取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchJob();
  }, []);

  const onSubmit = async (data: ApplyForm) => {
    try {
      const res = await fetch(`http://localhost:3001/api/jobs/${id}/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("応募に失敗しました");
      }
      setIsApplied(true);
    } catch (error) {
      console.error(error);
      toast.error("応募に失敗しました");
    }
  };

  if (isLoading) {
    return <p className="p-8">求人の詳細を取得中...</p>;
  }
  if (!job) {
    return <p className="p-8">求人の詳細が見つかりません。</p>;
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50 px-6 py-10 font-sans">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/jobs"
            className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 transition hover:text-black"
          >
            ← 募集一覧に戻る
          </Link>

          <JobDetailCard job={job} />
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              この募集に応募する
            </h2>

            {isApplied ? (
              <div className="rounded-xl bg-blue-50 p-6 text-center">
                <p className="font-bold text-blue-600">応募が完了しました！</p>
                <p className="mt-2 text-sm text-blue-500">
                  企業からの連絡をお待ちください。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <textarea
                  {...register("message", {
                    required: "企業への熱意やメッセージを入力してください",
                  })}
                  placeholder="なぜこの募集に興味を持ったのか、あなたの熱意を伝えてみましょう！"
                  rows={6}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
                <div className="flex justify-end">
                  <button
                    disabled={isSubmitting}
                    className="rounded-lg bg-black px-8 py-3 font-bold text-white shadow transition hover:bg-gray-800 disabled:opacity-50"
                  >
                    {isSubmitting ? "送信中..." : "応募する"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
