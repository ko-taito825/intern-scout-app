"use client";
import Link from "next/link";
import { JobResponse } from "@/app/_types/job";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function page() {
  const [jobs, setJobs] = useState<JobResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/jobs");
      if (!res.ok) {
        throw new Error("API通信に失敗しました");
      }
      const data: JobResponse[] = await res.json();
      setJobs(data);
    } catch (error) {
      console.error(error);
      toast.error("求人の一覧の取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (isLoading) {
    return <p className="p-8">求人の一覧を取得中...</p>;
  }
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 font-sans">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900">
          募集一覧
        </h1>

        {jobs.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100">
            <p className="text-gray-500 font-medium">
              現在、募集はありません。
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="group rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md hover:ring-blue-100"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {job.company_profile.industry || "業界未設定"}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    {job.company_profile.name}
                  </span>
                </div>
                <h2 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                  {job.title}
                </h2>

                <div className="mb-4 flex">
                  <span className="inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    📍 {job.work_style}
                  </span>
                </div>

                <p className="mb-6 text-gray-600 line-clamp-3 leading-relaxed">
                  {job.content}
                </p>

                <div className="flex justify-end border-t border-gray-50 pt-6">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="rounded-xl bg-black px-6 py-2.5 text-sm font-bold text-white shadow transition hover:bg-gray-800"
                  >
                    詳細を見る
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
