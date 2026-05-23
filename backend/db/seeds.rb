puts "データの初期化を開始します..."


Job.destroy_all
InternProfile.destroy_all
CompanyProfile.destroy_all
User.destroy_all

puts "企業データを作成中..."
companies_data = [
  { name: "株式会社プレックス2", industry: "IT・Web", description: "日本を動かす産業の課題を解決する、急成長中のスタートアップです。モダンな技術スタックでの開発を経験できます。", website_url: "https://plex.co.jp" },
  { name: "Tech Frontier株式会社", industry: "AI・機械学習", description: "最新のLLMを活用したSaaSプロダクトを開発しています。フロントエンドからバックエンドまで幅広くお任せします。", website_url: "https://example.com" },
  { name: "株式会社デザインシフト", industry: "UI/UXデザイン", description: "ユーザー体験を第一に考えたWebアプリケーション制作を行っています。デザインとエンジニアリングの橋渡しができる方を募集しています。", website_url: "https://example.com" }
]

companies_data.each do |data|
  user = User.create!(role: "company")
  user.create_company_profile!(data)
end

puts "インターン生データを作成中..."
interns_data = [
  {
    name: "鈴木 フロントエンド太郎",
    university: "東京情報大学",
    grade: "学部3年（27卒）",
    bio: "React, Next.js(App Router), TypeScript, TailwindCSSを用いたモダンなフロントエンド開発が得意です。個人開発でフルスタックなアプリを作っています。",
    github_url: "https://github.com/example1",
    portfolio_url: "https://example1.com"
  },
  {
    name: "佐藤 バックエンド花子",
    university: "早稲田大学",
    grade: "修士1年（27卒）",
    bio: "Ruby on RailsによるAPI開発を勉強中です。最近はN+1問題の解消など、パフォーマンスチューニングにも興味があります。",
    github_url: "https://github.com/example2",
    portfolio_url: ""
  },
  {
    name: "高橋 クロスオーバー次郎",
    university: "北海道大学",
    grade: "学部3年（27卒）",
    bio: "大学では地震工学や地球科学を専攻していますが、プログラミングスクールに通ってWeb開発を学んでいます。異分野の知識を掛け合わせたいです。",
    github_url: "https://github.com/example3",
    portfolio_url: "https://example3.com"
  },
  {
    name: "伊藤 デザイン志望",
    university: "慶應義塾大学",
    grade: "学部2年（28卒）",
    bio: "Figmaを使ったクリーンでダークテーマなUI/UXデザインが得意です。実装まで見据えたデザインを心がけています。",
    github_url: "",
    portfolio_url: "https://example4.com"
  },
  {
    name: "渡辺 継続力マッスル",
    university: "筑波大学",
    grade: "学部4年（26卒）",
    bio: "趣味は筋トレで、4年以上毎日継続しています。エンジニアリングでもこの継続力と根性を活かして、泥臭い課題解決に取り組みます！",
    github_url: "https://github.com/example5",
    portfolio_url: ""
  }
]

interns_data.each do |data|
  user = User.create!(role: "intern")
  user.create_intern_profile!(data)
end

puts "募集（求人）データを作成中..."
plex2_profile = CompanyProfile.find_by(name: "株式会社プレックス2")
tech_profile = CompanyProfile.find_by(name: "Tech Frontier株式会社")
design_profile = CompanyProfile.find_by(name: "株式会社デザインシフト")

jobs_data = [
  {
    company_profile: plex2_profile, 
    title: "【Next.js/App Router】新規スカウトサービスのフロントエンド開発",
    content: "TypeScript, TailwindCSSを活用し、クリーンでモダンなUIの実装をお任せします。ダークテーマにネオンアクセントを取り入れたイケてるデザインをFigmaから実装していただきます。",
    requirements: "ReactまたはNext.jsでの開発経験、TailwindCSSの基礎知識",
    work_style: "フルリモート可 / フルフレックス"
  },
  {
    company_profile: plex2_profile,
    title: "【防災テック】新規事業のバックエンドAPI開発インターン",
    content: "Railsを用いたAPI開発です。地震工学や火山学の知見を活かし、災害から人々を守る社会貢献性の高い事業のインフラ・アーキテクチャ設計に携われます。",
    requirements: "Ruby on Railsの基礎知識、データベース設計への関心",
    work_style: "週3日〜 / オフィス出社推奨"
  },
  {
    company_profile: tech_profile,
    title: "【フィットネス×IT】トレーニング管理アプリの開発エンジニア",
    content: "日々の筋トレやワークアウトの記録を分析し、最適なメニューを提案する新規プロダクトの開発です。泥臭く継続して課題解決に取り組める方をお待ちしています！",
    requirements: "4年以上の筋トレ継続力（冗談です！やる気重視）、Webアプリケーションの基礎知識",
    work_style: "リモート可 / ジム代補助あり"
  },
  {
    company_profile: design_profile,
    title: "【UI/UX】ダークテーマなイケてるWebアプリのUIデザイン",
    content: "Figmaを用いたUI/UXデザイン業務です。洗練されたダークテーマのデザインや、ユーザーの使い勝手（UX）を徹底的に追求できる環境です。",
    requirements: "Figmaの基本操作、ポートフォリオの提出",
    work_style: "フルリモート可 / 週2日〜"
  }
]

jobs_data.each do |data|
  Job.create!(data)
end

puts "シードデータの作成が完了しました！"
puts "企業数: #{CompanyProfile.count}社"
puts "学生数: #{InternProfile.count}名"
puts "募集数: #{Job.count}件"