export default function ActionButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button 
        className="p-2 text-text hover:text-primary hover:bg-surface rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={onClick}
        >
      <span className="material-symbols-outlined text-[20px]">{children}</span>
    </button>
  );
}