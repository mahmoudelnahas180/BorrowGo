import UnLoginHeader from "@/components/Header/UnLoginHeader";
import Footer from "@/components/Footer";

export default function UnauthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UnLoginHeader />
      {children}
      <Footer />
    </>
  );
}
