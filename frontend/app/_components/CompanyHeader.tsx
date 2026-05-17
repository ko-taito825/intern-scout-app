import Link from "next/link";

export default function CompanyHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 px-6 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between">
        <Link
          href="/companies/mypage"
          className="text-2xl font-extrabold tracking-tight transition-transform hover:scale-105"
        >
          <span className="bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            merge
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-bold text-gray-600">
          <Link
            href="/interns"
            className="hover:text-purple-500 transition-colors"
          >
            学生を探す
          </Link>
          <Link
            href="/companies/mypage"
            className="hover:text-purple-500 transition-colors"
          >
            マイページ
          </Link>
        </nav>
      </div>
    </header>
  );
}
