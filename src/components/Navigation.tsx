export default function Navigation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <nav className="w-11/12 mx-auto">
      {children}
      <hr className="border border-green mt-[10px]" />
    </nav>
  );
}
