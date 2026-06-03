"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { InternProfileResponse } from "../../_types/Intern";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useFetch } from "@/app/_hooks/useFetch";

export default function page() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const id = localStorage.getItem("current_user_id");
    if (!id) {
      toast.error("ログイン状態が確認できません");
      router.push("/companies/new");
      return;
    }
    setUserId(id);
  }, []);
  const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const headers = userId ? { "X-User-Id": userId } : null;
  const { data: internsData, isLoading: internsLoading } = useFetch<
    InternProfileResponse[]
  >(`${BASE}/api/interns`);
  const { data: scoutsData, isLoading: scoutsLoading } = useFetch<
    { intern_user_id: number }[]
  >(userId ? `${BASE}/api/scouts/sent` : null, headers);
  if (internsLoading || scoutsLoading) {
    return <p className="p-8">インターン生の一覧を取得中...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-3 text-4xl font-bold text-black">インターン生一覧</h1>
        <p className="mb-10 text-base text-gray-600">
          登録されているインターン生を確認できます
        </p>

        {internsData?.length === 0 ? (
          <p className="text-gray-500">
            登録されているインターン生はいません。
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {internsData?.map((intern) => {
              const isScouted = scoutsData?.some(
                (scout) => scout.intern_user_id === intern.user_id,
              );
              return (
                <div
                  key={intern.id}
                  className="flex flex-col rounded-2xl bg-white p-6 shadow-sm"
                >
                  <div className="flex-1">
                    <div className="mb-5 flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {intern.name}
                      </h2>
                      {isScouted && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          スカウト済み
                        </span>
                      )}
                    </div>

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
                        <p className="w-28 font-semibold text-gray-800">
                          GitHub
                        </p>
                        {intern.github_url && (
                          <a
                            href={intern.github_url}
                            target="_blank"
                            className="break-all text-blue-600 hover:underline"
                          >
                            {intern.github_url}
                          </a>
                        )}
                      </div>
                      <div className="flex">
                        <p className="w-28 font-semibold text-gray-800">
                          ポートフォリオ
                        </p>
                        {intern.portfolio_url && (
                          <a
                            href={intern.portfolio_url}
                            target="_blank"
                            className="break-all text-blue-600 hover:underline"
                          >
                            {intern.portfolio_url}
                          </a>
                        )}
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
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
