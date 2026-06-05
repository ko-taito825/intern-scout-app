"use client";
import Link from "next/link";
import { InternProfileResponse, MessageForm } from "@/app/_types/Intern";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useFetch } from "@/app/_hooks/useFetch";

export default function page() {
  const params = useParams();
  const id = params.id;
  const [messageSent, setMessageSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<MessageForm>();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("current_user_id");
    if (id) setUserId(id);
  }, []);

  const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const { data: internData, isLoading: internLoading } =
    useFetch<InternProfileResponse>(`${BASE}/api/intern_profiles/${id}`);
  const headers = userId ? { "X-User-Id": userId } : null;
  const { data: scoutData = [] } = useFetch<{ intern_user_id: number }[]>(
    userId ? `${BASE}/api/scouts/sent` : null,
    headers,
  );
  const isScouted = scoutData.some(
    (scout) => scout.intern_user_id === internData?.user_id,
  );
  const onSubmit = async (data: MessageForm) => {
    const userId = localStorage.getItem("current_user_id");
    try {
      const scoutRes = await fetch(
        (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000") +
          "/api/scouts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-User-Id": userId || "",
          },
          body: JSON.stringify({
            company_user_id: userId,
            intern_user_id: internData?.user_id,
          }),
        },
      );
      if (scoutRes.status === 422) {
        const errorData = await scoutRes.json();
        const isDuplicate = errorData.messages.some((msg: string) =>
          msg.includes("すでにスカウト済みです"),
        );
        if (isDuplicate) {
          setMessageSent(true);
          toast.error("この学生はすでにスカウト済みです");
          return;
        }
      }
      if (!scoutRes.ok) {
        throw new Error("スカウト作成に失敗しました");
      }
      const scout = await scoutRes.json();

      const messageRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/scouts/${scout.id}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-User-Id": userId || "",
          },
          body: JSON.stringify({ body: data.body }),
        },
      );
      if (!messageRes.ok) {
        throw new Error("メッセージの送信に失敗しました。");
      }
      setMessageSent(true);
    } catch (error) {
      console.error(error);
      toast.error("送信に失敗しました");
    }
  };
  if (internLoading) {
    return <p className="p-8">インターン生の詳細情報を取得中</p>;
  }

  if (!internData) {
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
            {internData.name}
          </h1>

          <div className="space-y-8 text-lg text-gray-700">
            <div className="flex items-start">
              <p className="w-40 text-xl font-semibold text-gray-900">大学名</p>

              <p className="leading-8">{internData.university}</p>
            </div>

            <div className="flex items-start">
              <p className="w-40 text-xl font-semibold text-gray-900">学年</p>

              <p className="leading-8">{internData.grade}</p>
            </div>

            <div className="flex items-start">
              <p className="w-40 text-xl font-semibold text-gray-900">自己PR</p>

              <p className="max-w-3xl leading-9">{internData.bio}</p>
            </div>

            {internData.github_url && (
              <div className="flex items-start">
                <p className="w-40 text-xl font-semibold text-gray-900">
                  GitHub
                </p>

                <a
                  href={internData.github_url}
                  target="_blank"
                  className="break-all text-blue-600 hover:underline"
                >
                  {internData.github_url}
                </a>
              </div>
            )}

            {internData.portfolio_url && (
              <div className="flex items-start">
                <p className="w-40 text-xl font-semibold text-gray-900">
                  ポートフォリオ
                </p>

                <a
                  href={internData.portfolio_url}
                  target="_blank"
                  className="break-all text-blue-600 hover:underline"
                >
                  {internData.portfolio_url}
                </a>
              </div>
            )}
          </div>
          <div className="mt-16 border-t pt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              スカウトメッセージを送る
            </h2>

            {messageSent ? (
              <p>メッセージを送信しました！</p>
            ) : isScouted ? (
              <p>すでにスカウット済みです</p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <textarea
                  {...register("body", {
                    required: "メッセージを入力してください",
                  })}
                  placeholder="熱いメッセージを入力してください"
                  rows={5}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
                {errors.body && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.body.message}
                  </p>
                )}
                <div className="flex justify-end">
                  <button
                    disabled={isSubmitting}
                    className="rounded-lg bg-black px-6 py-3 font-bold text-white transition hover:bg-gray-800 disabled:opacity-50"
                  >
                    {isSubmitting ? "送信中..." : "送信する"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
