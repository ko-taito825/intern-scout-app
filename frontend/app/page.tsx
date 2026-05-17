"use client";
import Link from "next/link";

export default function Page() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6">
      <div className="relative z-10 w-full max-w-5xl text-center">
        <div className="mb-20">
          <h1 className="font-bold tracking-tight">
            <span className="bg-linear-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent text-8xl sm:text-9xl">
              merge
            </span>
          </h1>

          <p className="mt-4 text-3xl sm:text-4xl font-medium text-gray-700">
            どちらで登録されますか？
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <Link
            href="/interns/new"
            className="group relative rounded-3xl border border-gray-200 bg-white p-10 text-left transition-all duration-300 hover:-translate-y-2 hover:border-sky-300 hover:shadow-[0_0_35px_rgba(56,189,248,0.1)]"
          >
            <div className="mb-6 flex h-56 items-center justify-center">
              <img
                src="/intern.png"
                alt="インターン生"
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <h2 className="mb-4 text-3xl font-bold text-gray-900 transition-colors group-hover:text-sky-500">
              インターン生として始める
            </h2>

            <p className="text-lg leading-relaxed text-gray-600">
              自分のプロフィールを作成し、企業の募集記事を探したり、企業からのスカウトを受け取ることができます。
            </p>
          </Link>

          <Link
            href="/companies/new"
            className="group relative rounded-3xl border border-gray-200 bg-white p-10 text-left transition-all duration-300 hover:-translate-y-2 hover:border-purple-300 hover:shadow-[0_0_35px_rgba(167,139,250,0.1)]"
          >
            <div className="mb-6 flex h-56 items-center justify-center">
              <img
                src="/company.png"
                alt="企業"
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_15px_rgba(167,139,250,0.2)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <h2 className="mb-4 text-3xl font-bold text-gray-900 transition-colors group-hover:text-purple-500">
              企業として始める
            </h2>

            <p className="text-lg leading-relaxed text-gray-600">
              企業のプロフィールを作成し、募集記事を投稿したり、優秀な学生を探して直接スカウトを送ることができます。
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
