export default function Chip({text, bg="bg-surface"}:{text:string, bg?:string}) {
  return (
    <span
      className={`whitespace-nowrap ${bg} px-4 py-1.5 rounded-full text-sm font-medium transition-all flex-shrink-0`}
    >
      {text}
    </span>
  );
}
