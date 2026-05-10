"use client";
import Link from "next/link";
import { InternProfile } from "@/app/_types/Intern";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const paramas = useParams();
  const id = paramas.id;
  const [intern, setIntern] = useState<InternProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchIntern = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/intern_profiles/${id}`,
      );
      if (!res.ok) {
        throw new Error("APIの通信に失敗しました。");
      }
      const data: InternProfile = await res.json();
      setIntern(data);
    } catch (error) {
      console.error(error);
      alert("インターン生詳細の取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchIntern();
  }, []);
  if (isLoading) {
    return <p className="p-8">インターン生の詳細情報を取得中</p>;
  }

  if (!intern) {
    return <p className="p-8">インターン生の詳細情報が見つかりません。</p>;
  }

  return (
    <div>
      <main className="min-h-screen bg-gray-50 px-8 py-14">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-14 shadow-sm">
          <Link
            href="/interns"
            className="mb-8 inline-block text-sm font-semibold text-gray-600 hover:text-black"
          >
            ← インターン生一覧に戻る
          </Link>
          <h1 className="mb-12 text-5xl font-bold tracking-tight text-black">
            {intern.name}
          </h1>

          <div className="space-y-8 text-lg text-gray-700">
            <div className="flex items-start">
              <p className="w-40 text-xl font-semibold text-gray-900">大学名</p>

              <p className="leading-8">{intern.university}</p>
            </div>

            <div className="flex items-start">
              <p className="w-40 text-xl font-semibold text-gray-900">学年</p>

              <p className="leading-8">{intern.grade}</p>
            </div>

            <div className="flex items-start">
              <p className="w-40 text-xl font-semibold text-gray-900">自己PR</p>

              <p className="max-w-3xl leading-9">{intern.bio}</p>
            </div>

            {intern.github_url && (
              <div className="flex items-start">
                <p className="w-40 text-xl font-semibold text-gray-900">
                  GitHub
                </p>

                <a
                  href={intern.github_url}
                  target="_blank"
                  className="break-all text-blue-600 hover:underline"
                >
                  {intern.github_url}
                </a>
              </div>
            )}

            {intern.portfolio_url && (
              <div className="flex items-start">
                <p className="w-40 text-xl font-semibold text-gray-900">
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
