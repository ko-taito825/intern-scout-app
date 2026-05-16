"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { InternProfile, ScoutInboxItem } from "../_types/Intern";
export default function page() {
  const [profile, setProfile] = useState<InternProfile | null>(null);
  const [scouts, setScouts] = useState<ScoutInboxItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [profileRes, scoutRes] = await Promise.all([
        fetch("http://localhost:3001/api/intern_profiles/me"),
        fetch("http://localhost:3001/api/scouts"),
      ]);
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData);
        console.log("プロフィールデータ", profileData);
      }
      if (scoutRes.ok) {
        const scoutData = await scoutRes.json();
        setScouts(scoutData);
        console.log("スカウトデータ", scoutData);
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
        <section className="bg-white border-b border-zinc-200 px-6 py-12 shadow-sm">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-600">
                  インターン生マイページ
                </span>
                <h1 className="mt-4 text-4xl font-extrabold text-zinc-900">
                  {profile?.name || "名前未設定"}
                </h1>
                <p className="mt-2 text-lg text-zinc-600">
                  {profile?.university || "大学未設定"} /{" "}
                  {profile?.grade || "-"}
                </p>

                <div className="mt-4 flex gap-4">
                  {profile?.github_url && (
                    <a
                      href={profile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-500 hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
              <Link
                href="/interns/edit"
                className="rounded-full border-2 border-black px-6 py-2 text-sm font-bold transition hover:bg-black hover:text-white"
              >
                プロフィールを編集
              </Link>
            </div>
            <div className="mt-8 rounded-xl bg-zinc-50 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                自己紹介
              </h3>
              <p className="mt-2 leading-relaxed text-zinc-700">
                {profile?.bio}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900">
              受信したスカウト
            </h2>
          </div>

          <div className="grid gap-4">
            {scouts.map((scout) => (
              <div
                key={scout.id}
                className="group block cursor-pointer rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 transition hover:ring-black"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-zinc-900 transition group-hover:text-blue-600">
                      {scout.company_name}
                    </h3>
                    <p className="line-clamp-2 mt-2 text-sm text-zinc-600">
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
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
