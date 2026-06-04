"use client";

import JobForm from "@/app/_components/JobForm";
import { JobProfileForm } from "@/app/_types/job";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function page() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [profile, setProfile] = useState<JobProfileForm | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("current_user_id");
    if (!userId) {
      toast.error("ログイン状態が確認できません");
      router.push("/companies/new");
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/jobs/${id}`,
        );
        if (!res.ok) {
          throw new Error("募集詳細の取得に失敗しました");
        }
        const profileData = await res.json();
        setProfile(profileData);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
        toast.error(
          "募集詳細の取得に失敗しました。画面をリロードしてください。",
        );
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (data: JobProfileForm) => {
    const userId = localStorage.getItem("current_user_id");
    if (!userId) {
      toast.error(
        "ログイン状態が確認できません、再度企業としてログインしてください",
      );
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/jobs/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-User-Id": userId,
          },
          body: JSON.stringify(data),
        },
      );
      if (!res.ok) {
        throw new Error("更新に失敗しました");
      }
      toast.success("募集を更新できました");
      router.push("/my-jobs");
    } catch (error) {
      console.error(error);
      toast.error("通信エラーが発生しました");
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "本当にこの募集を削除しますか？\n※この操作は取り消せません。",
    );
    if (!isConfirmed) return;
    const userId = localStorage.getItem("current_user_id");
    if (!userId) {
      toast.error("ログイン状態が確認できません");
      router.push("/companies/new");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/jobs/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-User-Id": userId,
          },
        },
      );
      if (!res.ok) {
        throw new Error("削除に失敗しました");
      }
      toast.success("募集を削除できました");
      router.push("/my-jobs");
    } catch (error) {
      console.error(error);
      toast.error("通信エラーが発生しました");
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            募集内容の編集
          </h1>
          <p className="mb-6 text-gray-600">募集情報を編集してください。</p>

          <JobForm
            onSubmit={handleUpdate}
            buttonText="更新する"
            defaultValues={profile}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </>
  );
}
