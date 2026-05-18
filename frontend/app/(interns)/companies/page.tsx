"use client";
import { CompanyProfileResponse } from "@/app/_types/company";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function page() {
  const [companies, setCompanies] = useState<CompanyProfileResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/company_profiles");
      if (!res.ok) {
        throw new Error("API通信に失敗しました");
      }
      const data: CompanyProfileResponse[] = await res.json();
      setCompanies(data);
    } catch (error) {
      console.error(error);
      toast.error("企業の一覧の取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCompanies();
  }, []);

  if (isLoading) {
    return <p className="p-8">企業の一覧を取得中...</p>;
  }
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-3 text-4xl font-bold text-black">企業一覧</h1>
        <p className="mb-10 text-base text-gray-600">
          気になる企業を見つけて、詳細や募集要項を確認してみましょう
        </p>

        {companies.length === 0 ? (
          <p className="text-gray-500">登録されている企業はいません。</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {companies.map((company) => (
              <div
                key={company.id}
                className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md"
              >
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                      {company.industry || "業界未設定"}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {company.name}
                    </h2>
                  </div>

                  <div className="space-y-4 text-gray-700">
                    <div className="flex flex-col">
                      <p className="mb-1 text-sm font-semibold text-gray-500">
                        企業説明
                      </p>

                      <p className="line-clamp-3 leading-relaxed text-sm">
                        {company.description || "企業説明がありません。"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-sm">
                    {company.website_url && (
                      <div className="flex">
                        <p className="w-24 font-semibold text-gray-800">
                          ホームページ
                        </p>
                        <a
                          href={company.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="line-clamp-1 flex-1 break-all text-blue-600 hover:underline"
                        >
                          {company.website_url}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-auto flex w-full justify-end pt-6">
                  <Link
                    href={`/companies/${company.id}`}
                    className="inline-block rounded-lg bg-black px-6 py-2 text-sm font-bold text-white transition hover:bg-gray-800"
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
