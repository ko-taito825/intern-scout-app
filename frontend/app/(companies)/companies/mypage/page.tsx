"use client";
import Link from "next/link";
import { CompanyProfileResponse, SentScoutItem } from "@/app/_types/company";
import { useEffect, useState } from "react";

export default function page() {
  const [profile, setProfile] = useState<CompanyProfileResponse | null>(null);
  const [scouts, setScouts] = useState<SentScoutItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [profileRes, scoutRes] = await Promise.all([
        fetch("http://localhost:3001/api/company_profiles/1"),
        fetch("http://localhost:3001/api/scouts/sent"),
      ]);
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData);
        console.log("企業プロフィールデータ", profileData);
      }
      if (scoutRes.ok) {
        const scoutData = await scoutRes.json();
        setScouts(scoutData);
        console.log("送信済みスカウトデータ", scoutData);
      }
    } catch (error) {
      console.error("データの取得に失敗しました", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center font-bold text-zinc-500">
        Loading...
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-zinc-50 pb-20 font-sans">
        <section className="border-b border-zinc-200 bg-white px-6 py-12 shadow-sm">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-bold text-purple-600">
                  企業マイページ
                </span>
                <h1 className="mt-4 text-4xl font-extrabold text-zinc-900">
                  {profile?.name || "企業名未設定"}
                </h1>
                <p className="mt-2 text-lg text-zinc-600">
                  {profile?.industry || "業界未設定"}
                </p>

                <div className="mt-4 flex gap-4">
                  {profile?.website_url && (
                    <a
                      href={profile.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-500 hover:underline"
                    >
                      Webサイト
                    </a>
                  )}
                </div>
              </div>
              <Link
                href="/companies/edit"
                className="rounded-full border-2 border-black px-6 py-2 text-sm font-bold transition hover:bg-black hover:text-white"
              >
                プロフィールを編集
              </Link>
            </div>

            <div className="mt-8 rounded-xl bg-zinc-50 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                企業説明
              </h3>
              <p className="mt-2 leading-relaxed text-zinc-700 whitespace-pre-wrap">
                {profile?.description || "企業説明がまだ設定されていません。"}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900">
              送信したスカウト
            </h2>
            <Link
              href="/interns"
              className="text-sm font-bold text-purple-600 hover:underline"
            >
              学生を探す →
            </Link>
          </div>

          <div className="grid gap-4">
            {scouts.length === 0 ? (
              <p className="text-zinc-500">
                まだ送信したスカウトはありません。
              </p>
            ) : (
              scouts.map((scout) => (
                <div
                  key={scout.id}
                  className="group block cursor-pointer rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 transition hover:ring-black"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-zinc-900 transition group-hover:text-purple-600">
                        {scout.intern_name || "学生名"}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-zinc-600">
                        {scout.latest_message}
                      </p>
                      <p className="mt-4 text-xs text-zinc-400">
                        {new Date(scout.created_at).toLocaleDateString("ja-JP")}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50 transition group-hover:bg-black group-hover:text-white">
                      →
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}
