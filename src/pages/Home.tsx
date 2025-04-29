import { ChangeEvent, useState } from "react";
import AddTaskButton from "../components/AddTaskButton";
import Navigation from "../components/Navigation";
import TaskSection from "../components/TasksSection";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router";
import { useTheme } from "../hooks/useTheme";

export default function Home() {
  const { authenticatedUser: user } = useLogin();
  const [value, setValue] = useState<string>("");
  const { theme, toggleTheme } = useTheme();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <>
      <Navigation>
        <div className="flex justify-center items-center">
          <Link
            to={"/login"}
            className="-scale-x-100 w-9 h-9 dark:bg-green light:bg-orange rounded-lg flex items-center justify-center"
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
                stroke="#3a3a3a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <p className="font-bold text-center text-xl grow">{user?.name}</p>

          <button className="w-9 h-9 cursor-pointer" onClick={toggleTheme}>
            {theme === "light" ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M6.34 17.66L4.93 19.07M19.07 4.93L17.66 6.34M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                  stroke="#3a3a3a"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3C10.8065 4.19347 10.136 5.81217 10.136 7.5C10.136 9.18783 10.8065 10.8065 12 12C13.1935 13.1935 14.8122 13.864 16.5 13.864C18.1878 13.864 19.8065 13.1935 21 12C21 13.78 20.4722 15.5201 19.4832 17.0001C18.4943 18.4802 17.0887 19.6337 15.4442 20.3149C13.7996 20.9961 11.99 21.1743 10.2442 20.8271C8.49836 20.4798 6.89472 19.6226 5.63604 18.364C4.37737 17.1053 3.5202 15.5016 3.17294 13.7558C2.82567 12.01 3.0039 10.2004 3.68509 8.55585C4.36628 6.91131 5.51983 5.50571 6.99987 4.51677C8.47991 3.52784 10.22 3 12 3Z"
                  stroke="#EAF0FF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </button>
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
          className="grow h-12 dark:text-green light:text-orange w-42 dark:bg-dark light:bg-white-secondary rounded-lg px-9 py-2 bg-[url(./assets/search.svg)] bg-[8px] bg-no-repeat focus:outline dark:focus:border-green light:focus:outline-orange opacity-50 focus:opacity-100 transition-all"
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
