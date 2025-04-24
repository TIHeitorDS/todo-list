import { Link } from "react-router";

export default function AddTaskButton() {
  return (
    <Link
    to={"/criar-tarefa"}
      className="dark:bg-green light:bg-orange text-dark rounded-full text-2xl w-12 h-12 flex justify-center items-center cursor-pointer"
    >
      +
    </Link>
  );
}
