export function Button({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button onClick={onClick} className="bg-slate-300 p-2 rounded">
      {children}
    </button>
  );
}
