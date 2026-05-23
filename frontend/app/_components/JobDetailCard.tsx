"use client";
import Link from "next/link";
import { JobResponse } from "../_types/job";
type Props = {
  job: JobResponse;
};
export default function JobDetailCard({ job }: Props) {
  return (
    <>
      <div className="mb-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
        <div className="border-b border-gray-100 pb-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              {job.company_profile.industry || "業界未設定"}
            </span>

            <Link
              href={`/companies/${job.company_profile.id}`}
              className="text-sm font-medium text-gray-500 transition hover:text-blue-600 hover:underline"
            >
              {job.company_profile.name} の詳細を見る
            </Link>
          </div>
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            {job.title}
          </h1>
          <div className="mt-4 flex">
            <span className="inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
              📍 {job.work_style}
            </span>
          </div>
        </div>

        <div className="space-y-8 py-6">
          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-400">
              業務内容
            </h2>
            <p className="whitespace-pre-wrap text-base leading-7 text-gray-800">
              {job.content}
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-400">
              必須・歓迎スキル
            </h2>
            <p className="whitespace-pre-wrap text-base leading-7 text-gray-800">
              {job.requirements || "特になし"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
