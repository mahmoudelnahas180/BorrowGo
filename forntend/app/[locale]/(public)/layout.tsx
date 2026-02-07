import UnLoginHeader from "@/components/Header/UnLoginHeader";

export default function UnauthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UnLoginHeader />
      {children}
    </>
  );
}
