import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white shadow-sm">
        C
      </div>
      <div>
        <p className="text-lg font-semibold text-secondary">Calabaza</p>
    </div>
  </Link>
)}
