import { Link } from "react-router";

export default function TaskCard({
  title,
  id,
  category,
}: {
  title: string;
  id: string;
  category: string;
}) {
  const categoryColors: Record<string, string> = {
    trabalho: "bg-green",
    pessoal: "bg-pink",
    faculdade: "bg-orange",
  };

  const bgColor = categoryColors[category.toLowerCase()] ?? "bg-orange-400";

  return (
    <Link
      to={`tarefa/${id}`}
      className="mt-4 bg-dark rounded-lg flex flex-col justify-between h-[98px] hover:scale-105 transition-all"
    >
      <div className="flex justify-between items-center px-3 py-2 h-full">
        <p>{title}</p>
      </div>

      <button
        type="button"
        className={`${bgColor} w-full text-dark text-end px-2 font-medium rounded-b-lg cursor-pointer`}
      >
        {">"}
      </button>
    </Link>
  );
}
