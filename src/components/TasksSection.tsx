import { useEffect, useState } from "react";
import { fetchAllTasks } from "../firebase/database";
import { Task } from "../lib/definitions";
import TaskCard from "./TaskCard";
import { useLogin } from "../hooks/useLogin";

export default function TaskSection({
  sectionTitle,
  searchTerm,
}: {
  sectionTitle: string;
  searchTerm: string;
}) {
  const [tasks, setTasks] = useState<Task[]>();
  const { user } = useLogin();

  useEffect(() => {
    if (user) {
      fetchAllTasks(user).then((result) => {
        setTasks(result);
      });
    }
  }, []);

  return (
    <section>
      {tasks &&
        tasks.length > 0 &&
        (() => {
          const filteredTasks = tasks.filter(
            (task) =>
              !task.status &&
              task.category === sectionTitle &&
              task.title
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
          );

          return filteredTasks.length > 0 ? (
            <>
              <p className="font-bold text-2xl">{sectionTitle}</p>
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  category={task.category}
                />
              ))}
            </>
          ) : null;
        })()}
    </section>
  );
}
