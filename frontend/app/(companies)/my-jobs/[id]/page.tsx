"use client";

import JobDetailCard from "@/app/_components/JobDetailCard";
import { JobResponse } from "@/app/_types/job";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function page() {
  const params = useParams();
  const id = params.id;
  const [job, setJob] = useState<JobResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchJob = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/jobs/${id}`,
      );
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

  if (isLoading) {
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
