"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CompanyLayout() {
  const router = useRouter();
  const handleLogout = () => {
    const isConfirmed = window.confirm("ログアウトしてもよろしいでしょうか？");
    if (!isConfirmed) {
      return;
    }
    localStorage.clear();
    router.push("/");
  };
  return (
    <>
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
          <div className="text-xl font-bold text-purple-600">
            <Link href="/">merge</Link>
          </div>

          <nav className="flex items-center space-x-6 gap-6">
            <Link
              href="/interns" // ※URLは実際の「学生を探す」ページに合わせてください
              className="text-sm font-medium text-gray-600 transition-colors hover:text-purple-600"
            >
              学生を探す
            </Link>

            <Link
              href="/my-jobs"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-purple-600"
            >
              募集一覧・編集
            </Link>
            <Link
              href="/companies/mypage"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-purple-600"
            >
              マイページ
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-purple-600"
            >
              ログアウト
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}
