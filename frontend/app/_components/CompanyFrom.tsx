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
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input
          {...register("name", { required: "企業名は必須です" })}
          placeholder="企業名"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
        <input
          {...register("industry", { required: "業界は必須です" })}
          placeholder="業界"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />
        {errors.industry && (
          <p className="mt-1 text-sm text-red-500">{errors.industry.message}</p>
        )}
        <textarea
          {...register("description", { required: "企業説明は必須です" })}
          placeholder="企業説明(技術スタック/価値観/開発体制など)"
          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
        <input
          {...register("website_url")}
          placeholder="WebサイトURL"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />
        <button
          disabled={isSubmitting}
          className="w-full rounded-lg bg-black px-4 py-3 font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {buttonText}
        </button>
      </form>
    </>
  );
}
