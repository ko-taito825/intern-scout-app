"use client";

import { useForm } from "react-hook-form";
import { CompanyProfileFrom } from "../_types/company";

type Props = {
  onSubmit: (data: CompanyProfileFrom) => Promise<void>;
  buttonText: string;
  defaultValues?: CompanyProfileFrom | null;
};

export default function CompanyFrom({
  onSubmit,
  buttonText,
  defaultValues,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CompanyProfileFrom>({
    values: defaultValues || undefined,
  });

  const inputClassName =
    "w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <input
            {...register("name", { required: "企業名は必須です" })}
            placeholder="企業名"
            className={inputClassName}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("industry", { required: "業界は必須です" })}
            placeholder="業界"
            className={inputClassName}
          />
          {errors.industry && (
            <p className="mt-1 text-sm text-red-500">
              {errors.industry.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            {...register("description", { required: "企業説明は必須です" })}
            placeholder="企業説明(技術スタック/価値観/開発体制など)"
            className={`${inputClassName} resize-none h-32`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register("website_url")}
            placeholder="WebサイトURL"
            className={inputClassName}
          />
        </div>

        <button
          disabled={isSubmitting}
          className="mt-4 w-full rounded-lg bg-purple-500 px-4 py-3 font-bold text-white shadow-sm transition-all hover:bg-purple-600 hover:shadow-md hover:shadow-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {buttonText}
        </button>
      </form>
    </>
  );
}
