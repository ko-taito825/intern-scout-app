"use client";

import { useForm } from "react-hook-form";
import { JobProfileForm } from "../_types/job";

type Props = {
  onSubmit: (data: JobProfileForm) => Promise<void>;
  buttonText: string;
  defaultValues?: JobProfileForm | null;
};

export default function JobForm({
  onSubmit,
  buttonText,
  defaultValues,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<JobProfileForm>({
    values: defaultValues || undefined,
  });
  const inputClassName =
    "w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20";
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <input
          {...register("title", { required: "タイトルは必須です" })}
          placeholder="募集タイトル (例: 【React/Next.js】フロントエンドエンジニア募集！)"
          className={inputClassName}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("work_style", { required: "働き方は必須です" })}
          placeholder="働き方・勤務地 (例: フルリモート (週3日〜))"
          className={inputClassName}
        />
        {errors.work_style && (
          <p className="mt-1 text-sm text-red-500">
            {errors.work_style.message}
          </p>
        )}
      </div>

      <div>
        <textarea
          {...register("content", { required: "業務内容は必須です" })}
          placeholder="業務内容 (具体的な業務内容や、入社後のステップなどを記入してください)"
          className={`${inputClassName} resize-none h-32`}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("requirements")}
          placeholder="必須・歓迎スキル (例: Reactの基礎知識、Gitの基本操作など)"
          className={`${inputClassName} resize-none h-32`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 w-full rounded-lg bg-purple-500 px-4 py-3 font-bold text-white shadow-sm transition-all hover:bg-purple-600 hover:shadow-md hover:shadow-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "送信中..." : buttonText}
      </button>
    </form>
  );
}
