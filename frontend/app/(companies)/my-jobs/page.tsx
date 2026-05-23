"use client";
import Link from "next/link";
import { JobPosting } from "@/app/_types/job";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function page() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const userId = localStorage.getItem("current_user_id");
      try {
        const res = await fetch("http://localhost:3001/api/jobs", {
          headers: {
            "Content-Type": "application/json",
            "X-User-Id": userId || "",
          },
        });
        if (!res.ok) {
          throw new Error("API通信に失敗しました");
        }
        const data: JobPosting[] = await res.json();
        setJobs(data);
        toast.success("募集一覧を取得しました");
      } catch (error) {
        console.error(error);
        toast.error("募集一覧の取得に失敗しました");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (isLoading) {
    return <p className="p-8">募集の一覧を取得中...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              自社の募集要項一覧・編集
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              掲載中の募集要項の確認・編集、新規作成ができます。
            </p>
          </div>

          <Link
            href="/my-jobs/new"
            className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-purple-100 shadow-sm transition-all hover:bg-purple-700 hover:shadow"
          >
            ＋ 新しく募集要項を作成
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-gray-100">
            <p className="text-gray-500 font-medium">
              現在、作成された募集要項はありません。
            </p>
            <Link
              href="/my-jobs/new"
              className="mt-4 inline-block text-sm font-bold text-purple-600 hover:underline"
            >
              最初の募集要項を作成してみる
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md sm:flex-row sm:items-center"
              >
                <div>
                  <span className="inline-block rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700">
                    {job.work_style}
                  </span>
                  <h2 className="mt-2 text-lg font-bold text-gray-900">
                    {job.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                    {job.content}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-3 sm:mt-0">
                  <Link
                    href={`/my-jobs/${job.id}`}
                    className="rounded-xl bg-gray-50 px-4 py-2.5 text-sm font-bold text-gray-600 transition hover:bg-gray-100"
                  >
                    プレビュー
                  </Link>

                  <Link
                    href={`/my-jobs/${job.id}/edit`}
                    className="rounded-xl bg-purple-50 px-4 py-2.5 text-sm font-bold text-purple-700 transition hover:bg-purple-100"
                  >
                    編集する
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
