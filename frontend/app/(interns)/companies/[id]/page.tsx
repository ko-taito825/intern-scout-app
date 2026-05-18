"use client";
import Link from "next/link";
import { CompanyProfileResponse } from "@/app/_types/company";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function page() {
  const params = useParams();
  const id = params.id;
  const [company, setCompany] = useState<CompanyProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCompany = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/company_profiles/${id}`,
      );
      if (!res.ok) {
        throw new Error("APIの通信に失敗しました。");
      }
      const data: CompanyProfileResponse = await res.json();
      setCompany(data);
    } catch (error) {
      console.error("Error fetching company profile:", error);
      toast.error("企業詳細の取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCompany();
  }, []);

  if (isLoading) {
    return <p className="p-8">企業の詳細情報を取得中...</p>;
  }
  if (!company) {
    return <p className="p-8">企業の詳細情報が見つかりません。</p>;
  }
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 font-sans">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/companies"
          className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-black transition"
        >
          ← 企業一覧に戻る
        </Link>

        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <div className="border-b border-gray-100 pb-6">
            <span className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              {company.industry || "業界未設定"}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {company.name}
            </h1>
          </div>

          <div className="py-6 space-y-6">
            <div>
              <h2 className="mb-2 text-sm font-bold text-gray-400 uppercase tracking-wider">
                企業説明
              </h2>

              <p className="whitespace-pre-wrap text-base leading-7 text-gray-800">
                {company.description || "企業説明がありません。"}
              </p>
            </div>

            {company.website_url && (
              <div className="pt-4">
                <h2 className="mb-2 text-sm font-bold text-gray-400 uppercase tracking-wider">
                  ホームページ
                </h2>
                <a
                  href={company.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block break-all text-blue-600 hover:underline font-medium"
                >
                  {company.website_url}
                </a>
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6 flex justify-end">
            <Link
              href={`/jobs?company_id=${company.id}`}
              className="rounded-xl bg-black px-6 py-3 text-sm font-bold text-white shadow transition hover:bg-gray-800"
            >
              この企業の募集を見る
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
