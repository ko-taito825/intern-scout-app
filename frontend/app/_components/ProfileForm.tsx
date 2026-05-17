"use client";

import { InternProfileForm } from "@/app/_types/Intern";
import { useForm } from "react-hook-form";

type Props = {
  onSubmit: (data: InternProfileForm) => Promise<void>;
  buttonText: string;
  defaultValues?: InternProfileForm | null;
};

export default function ProfileForm({
  onSubmit,
  buttonText,
  defaultValues,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<InternProfileForm>({
    values: defaultValues || undefined,
  });

  const inputClassName =
    "w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <input
            {...register("name", { required: "名前は必須です" })}
            placeholder="名前"
            className={inputClassName}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("university", { required: "大学名は必須です" })}
            placeholder="大学"
            className={inputClassName}
          />
          {errors.university && (
            <p className="mt-1 text-sm text-red-500">
              {errors.university.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register("grade", { required: "学年は必須です" })}
            placeholder="学年"
            className={inputClassName}
          />
          {errors.grade && (
            <p className="mt-1 text-sm text-red-500">{errors.grade.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register("bio", { required: "自己PRを記入してください" })}
            placeholder="自己PR(強み、何をどんな考えで作ったのか)"
            className={`${inputClassName} resize-none h-32`}
          />
          {errors.bio && (
            <p className="mt-1 text-sm text-red-500">{errors.bio.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("github_url")}
            placeholder="Github URL"
            className={inputClassName}
          />
        </div>

        <div>
          <input
            {...register("portfolio_url")}
            placeholder="ポートフォリオ URL"
            className={inputClassName}
          />
        </div>

        <button
          disabled={isSubmitting}
          className="mt-4 w-full rounded-lg bg-sky-500 px-4 py-3 font-bold text-white shadow-sm transition-all hover:bg-sky-600 hover:shadow-md hover:shadow-sky-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {buttonText}
        </button>
      </form>
    </>
  );
}
