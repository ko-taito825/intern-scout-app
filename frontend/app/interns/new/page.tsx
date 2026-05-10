"use client";

import { InternProfileForm } from "@/app/_types/Intern";
import { useForm } from "react-hook-form";

export default function page() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<InternProfileForm>();
  const onSubmit = async (data: InternProfileForm) => {
    const res = await fetch("http://localhost:3001/api/intern_profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      alert("登録に失敗しました");
      return;
    }
    alert("登録できました");
    reset();
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            インターン生登録
          </h1>
          <p>プロフィール情報を入力してください。</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <input
              {...register("name", { required: "名前は必須です" })}
              placeholder="名前"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
            <input
              {...register("university", { required: "大学名は必須です" })}
              placeholder="大学"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
            {errors.university && (
              <p className="mt-1 text-sm text-red-500">
                {errors.university.message}
              </p>
            )}
            <input
              {...register("grade", { required: "学年は必須です" })}
              placeholder="学年"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
            {errors.grade && (
              <p className="mt-1 text-sm text-red-500">
                {errors.grade.message}
              </p>
            )}
            <textarea
              {...register("bio", { required: "自己PRを記入してください" })}
              placeholder="自己PR"
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
            {errors.bio && (
              <p className="mt-1 text-sm text-red-500">{errors.bio.message}</p>
            )}
            <input
              {...register("github_url")}
              placeholder="Github URL"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
            <input
              {...register("portfolio_url")}
              placeholder="ポートフォリオ URL"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
            <button
              disabled={isSubmitting}
              className="w-full rounded-lg bg-black px-4 py-3 font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "登録中" : "登録する"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
