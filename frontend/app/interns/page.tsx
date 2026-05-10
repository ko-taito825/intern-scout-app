"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { InternProfile } from "../_types/Intern";

export default function page() {
  const [interns, setInterns] = useState<InternProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInterns = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/intern_profiles");
      if (!res.ok) {
        throw new Error("API通信に失敗しました");
      }
      const data: InternProfile[] = await res.json();
      setInterns(data);
    } catch (error) {
      console.error(error);
      alert("インターン生一覧の取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInterns();
  }, []);

  if (isLoading) {
    return <p className="p-8">インターン生の一覧を取得中...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-3 text-4xl font-bold text-black">インターン生一覧</h1>
        <p className="mb-10 text-base text-gray-600">
          登録されているインターン生を確認できます
        </p>

        {interns.length === 0 ? (
          <p className="text-gray-500">
            登録されているインターン生はいません。
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {interns.map((intern) => (
              <div
                key={intern.id}
                className="flex flex-col rounded-2xl bg-white p-6 shadow-sm"
              >
                {/* 上部コンテンツ */}
                <div className="flex-1">
                  <h2 className="mb-5 text-2xl font-bold text-gray-900">
                    {intern.name}
                  </h2>

                  <div className="space-y-3 text-gray-700">
                    <div className="flex">
                      <p className="w-28 font-semibold">大学名</p>
                      <p>{intern.university}</p>
                    </div>
                    <div className="flex">
                      <p className="w-28 font-semibold">学年</p>
                      <p>{intern.grade}</p>
                    </div>
                    <div className="flex">
                      <p className="w-28 font-semibold">自己PR</p>
                      <p className="leading-7">{intern.bio}</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex">
                      <p className="w-28 font-semibold text-gray-800">GitHub</p>
                      <a
                        href={intern.github_url}
                        target="_blank"
                        className="break-all text-blue-600 hover:underline"
                      >
                        {intern.github_url}
                      </a>
                    </div>
                    <div className="flex">
                      <p className="w-28 font-semibold text-gray-800">
                        ポートフォリオ
                      </p>
                      <a
                        href={intern.portfolio_url}
                        target="_blank"
                        className="break-all text-blue-600 hover:underline"
                      >
                        {intern.portfolio_url}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex w-full justify-end pt-5">
                  <Link
                    href={`/interns/${intern.id}`}
                    className="inline-block rounded-lg bg-black px-4 py-2 text-sm font-bold text-white"
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
