import { Link } from "react-router";

export default function AddTaskButton() {
  return (
    <Link
    to={"/criar-tarefa"}
      className="bg-green text-dark rounded-full text-2xl w-12 h-12 flex justify-center items-center cursor-pointer"
    >
      +
    </Link>
  );
}
