"use client";
import Link from "next/link";
import {
  AppliedEntry,
  CompanyProfileResponse,
  SentScoutItem,
} from "@/app/_types/company";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const [profile, setProfile] = useState<CompanyProfileResponse | null>(null);
  const [scouts, setScouts] = useState<SentScoutItem[]>([]);
  const [appliedEntries, setAppliedEntries] = useState<AppliedEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("current_user_id");
      if (!userId) {
        router.push("/companies/new");
        return;
      }
      try {
        const authHeaders = {
          "Content-Type": "application/json",
          "X-User-Id": userId,
        };
        const [profileRes, scoutRes, entryRes] = await Promise.all([
          fetch("http://localhost:3001/api/company_profiles/me", {
            headers: authHeaders,
          }),
          fetch("http://localhost:3001/api/scouts/sent", {
            headers: authHeaders,
          }),
          fetch("http://localhost:3001/api/entries", {
            headers: authHeaders,
          }),
        ]);
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
        }
        if (scoutRes.ok) {
          const scoutData = await scoutRes.json();
          setScouts(scoutData);
        }
        if (entryRes.ok) {
          const entryData = await entryRes.json();
          setAppliedEntries(entryData);
          console.log("応募データ:", entryData);
        }
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      } finally {
        setIsLoading(false);
      }
    };
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

        <section className="mx-auto max-w-4xl px-6 pt-12 pb-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900">届いた応募</h2>
            <Link
              href="/my-jobs"
              className="text-sm font-bold text-purple-600 hover:underline"
            >
              自社の求人を見る →
            </Link>
          </div>

          <div className="grid gap-4">
            {appliedEntries.length === 0 ? (
              <p className="text-zinc-500">まだ届いている応募はありません。</p>
            ) : (
              appliedEntries.map((entry) => (
                <div
                  key={`entry-${entry.id}`}
                  className="block rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-full">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/interns/${entry.applicant_id}`}
                          className="font-bold text-zinc-900 transition hover:text-purple-600 hover:underline"
                        >
                          {entry.applicant_name} さん
                        </Link>
                        {entry.has_unread && (
                          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-600">
                            未読
                          </span>
                        )}
                        <span className="rounded bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-600">
                          応募先: {entry.job_title}
                        </span>
                      </div>
                      <div className="mt-4 rounded-xl bg-zinc-50 p-4">
                        <p className="whitespace-pre-wrap text-sm text-zinc-700">
                          {entry.message}
                        </p>
                      </div>
                      <p className="mt-4 text-xs text-zinc-400">
                        {new Date(entry.created_at).toLocaleDateString("ja-JP")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex w-full justify-end pt-4 border-t border-zinc-100">
                    <Link
                      href={`/companies/apply-chat/${entry.id}`}
                      className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-2 text-sm font-bold text-white transition hover:bg-zinc-800"
                    >
                      応募者とチャットする →
                    </Link>
                  </div>
                </div>
              ))
            )}
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
                <Link
                  href={`/companies/chat/${scout.id}`}
                  key={scout.id}
                  className="group block cursor-pointer rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 transition hover:ring-purple-500"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-zinc-900 transition group-hover:text-purple-600">
                          {scout.intern_name || "学生名"}
                        </h3>
                        {scout.has_unread && (
                          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-600">
                            未読
                          </span>
                        )}
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm text-zinc-600">
                        {scout.latest_message}
                      </p>

                      <p className="mt-4 text-xs font-medium text-zinc-400">
                        {new Date(scout.created_at).toLocaleString("ja-JP", {
                          month: "numeric",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50 transition group-hover:bg-purple-600 group-hover:text-white">
                      →
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}
