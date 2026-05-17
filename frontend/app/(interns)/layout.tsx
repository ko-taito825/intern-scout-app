import InternHeader from "../_components/InternHeader";

export default function InternLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InternHeader />
      {/* /interns 配下のページ（マイページや編集画面など）がここに入ります */}
      {children}
    </>
  );
}
