import { ChangeEvent, useState } from "react";
import AddTaskButton from "../components/AddTaskButton";
import Navigation from "../components/Navigation";
import TaskSection from "../components/TasksSection";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router";

export default function Home() {
  const { user } = useLogin();
  const [value, setValue] = useState<string>("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <>
      <Navigation>
        <div className="flex justify-center items-center">
          <Link
            to={"/login"}
            className="-scale-x-100 w-9 h-9 bg-[#B22222]  rounded-lg flex items-center justify-center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
                stroke="#f5f5f5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <p className="font-bold text-center text-xl grow">{user?.name}</p>
        </div>
      </Navigation>

      <div className="mt-9 flex justify-between gap-4">
        <input
          type="text"
          name="task"
          id="task"
          value={value}
          onChange={(e) => handleChange(e)}
          placeholder="Pesquisar"
          className="grow h-12 text-green w-42 opacity-50 bg-dark rounded-lg px-9 py-2 bg-[url(./assets/search.svg)] bg-[8px] bg-no-repeat focus:outline-green focus:opacity-100 transition-all"
        />

        <AddTaskButton />
      </div>

      <main className="mt-8 space-y-8">
        <TaskSection sectionTitle="Pessoal" searchTerm={value} />
        <TaskSection sectionTitle="Trabalho" searchTerm={value} />
        <TaskSection sectionTitle="Faculdade" searchTerm={value} />
      </main>
    </>
  );
}
