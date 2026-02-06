export default function UnauthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full h-50 bg-red-500 dark:bg-gray-800">fff</div>
      {children}
    </>
  );
}
