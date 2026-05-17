import CompanyHeader from "../_components/CompanyHeader";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CompanyHeader />
      {/* /companies 配下のページがここに入ります */}
      {children}
    </>
  );
}
