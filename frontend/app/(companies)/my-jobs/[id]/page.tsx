"use client";

import JobDetailCard from "@/app/_components/JobDetailCard";
import { useFetch } from "@/app/_hooks/useFetch";
import { JobResponse } from "@/app/_types/job";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const params = useParams();
  const id = params.id;
  const [userId, setUserId] = useState<string | null>(null);
  const headers = userId ? { "X-User-Id": userId } : null;
  useEffect(() => {
    const id = localStorage.getItem("current_user_id");
    if (id) setUserId(id);
  }, []);
  const { data: job, isLoading: jobLoading } = useFetch<JobResponse>(
    userId
      ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/job_postings/${id}`
      : null,
    headers,
  );

  if (jobLoading) {
    return <p className="p-8">募集の詳細を取得中...</p>;
  }
  if (!job) {
    return <p className="p-8">募集の詳細が見つかりません。</p>;
  }
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 font-sans">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/my-jobs"
          className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 transition hover:text-black"
        >
          ← 募集一覧に戻る
        </Link>
        <JobDetailCard job={job} />
      </div>
    </main>
  );
}
