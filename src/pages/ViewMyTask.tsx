import { Link, useParams } from "react-router";
import Navigation from "../components/Navigation";
import { useEffect, useRef, useState } from "react";
import { fetchTask, updateTask } from "../firebase/database";
import { Task } from "../lib/definitions";
import { useLogin } from "../hooks/useLogin";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useForm } from "react-hook-form";

export default function ViewMyTask() {
  let params = useParams();
  const [task, setTask] = useState<Task | null>();
  const { user } = useLogin();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [showEdit, setShowEdit] = useState(false);
  const successAlert = useRef<HTMLDivElement>(null);
  const [alertText, setAlertText] = useState("");
  const errorAlert = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user && params.taskId) {
      fetchTask(user, params.taskId).then((result) => {
        setTask(result);
        setValue("description", result!.description);
        setValue("date", result!.date);
      });
    }
  }, [user, params.taskId]);

  function formatDate(dateString: string) {
    return format(parseISO(dateString), "EEE, d 'de' MMMM", {
      locale: ptBR,
    });
  }

  async function onSubmit(data: any) {
    const response = await updateTask(user!, params.taskId!, data);
    if (response) {
      setAlertText("Tarefa editada com sucesso");
      reset(data);
      successAlert.current?.classList.remove("translate-x-full");
      successAlert.current?.classList.add("translate-x-0");
      setTimeout(() => {
        successAlert.current?.classList.remove("translate-x-0");
        successAlert.current?.classList.add("translate-x-full");
      }, 2000);
    } else {
      errorAlert.current?.classList.remove("translate-x-full");
      errorAlert.current?.classList.add("translate-x-0");
      setTimeout(() => {
        errorAlert.current?.classList.remove("translate-x-0");
        errorAlert.current?.classList.add("translate-x-full");
      }, 2000);
    }

    setShowEdit(false);
  }

  useEffect(() => {
    fetchTask(user!, params.taskId!).then((result) => {
      setTask(result);
      setValue("description", result!.description);
      setValue("date", result!.date);
    });
  }, [user, params.taskId, showEdit]);

  return (
    <div className="relative overflow-hidden w-full">
      {task && (
        <>
          <div className={`${showEdit ? "blur-sm" : ""}`}>
            <Navigation>
              <div className="flex items-center justify-center ">
                <Link
                  to={"/"}
                  className="text-green text-xl cursor-pointer h-full"
                >
                  {"<"}
                </Link>
                <p className="font-bold text-xl text-center grow">
                  {task?.title}
                </p>
              </div>
            </Navigation>
          </div>

          <main className={`mt-[70px] z-30 ${showEdit ? "blur-sm" : ""}`}>
            <div className="flex items-center space-x-2">
              <p className="text-pink">Concluir em {formatDate(task.date)}</p>
            </div>

            <div className="bg-dark rounded-lg p-3.5 h-fit mt-[20px] mb-24">
              {task.description ? task.description : "Sem descrição"}
            </div>

            <div className="flex gap-4 items-center w-fit mx-auto">
              <button
                onClick={() => setShowEdit(true)}
                className="text-green border border-green font-medium px-4 py-2 rounded-xl cursor-pointer hover:opacity-50 transition-opacity"
              >
                Editar
              </button>

              <button
                type="button"
                onClick={async () => {
                  const response = await updateTask(user!, params.taskId!, {
                    ...task,
                    status: true,
                  });
                  if (response) {
                    setAlertText("Tarefa concluída com sucesso");
                    successAlert.current?.classList.remove("translate-x-full");
                    successAlert.current?.classList.add("translate-x-0");
                    setTimeout(() => {
                      successAlert.current?.classList.remove("translate-x-0");
                      successAlert.current?.classList.add("translate-x-full");
                    }, 2000);
                  }
                }}
                className="bg-green text-dark font-medium px-4 py-2 rounded-xl cursor-pointer hover:opacity-50 transition-opacity"
              >
                Concluída
              </button>
            </div>
          </main>

          {showEdit && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="z-50 w-11/12 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-6 bg-dark flex flex-col justify-center items-center gap-6 rounded-lg"
            >
              <div className="space-x-2 flex items-center">
                <label htmlFor="date">Data para concluir tarefa </label>
                <input
                  type="date"
                  id="date"
                  className="bg-dark p-[10px] w-fit border-b border-b-green outline-0"
                  {...register("date")}
                />
              </div>

              <textarea
                id="description"
                className="bg-dark rounded-xl ring focus:ring focus:ring-green text-white/50 px-3 py-[10px] outline-0"
                placeholder="Descrição"
                {...register("description")}
              ></textarea>

              <div className="flex gap-4 items-center w-fit mx-auto">
                <button
                  onClick={() => setShowEdit(false)}
                  className="ring ring-green p-2 rounded-2xl cursor-pointer w-24"
                >
                  Fechar
                </button>
                <button
                  type="submit"
                  className="bg-green p-2 text-dark rounded-2xl cursor-pointer w-24"
                >
                  Editar
                </button>
              </div>
            </form>
          )}
        </>
      )}
      <div
        ref={successAlert}
        className="bg-white font-bold text-lg tracking-wide text-dark p-4 flex justify-center items-center border-b-4 border-b-green absolute top-0 inset-x-0 translate-x-full transition-all duration-300"
      >
        <p>{alertText}</p>
      </div>

      <div
        ref={errorAlert}
        className="bg-white font-bold text-lg tracking-wide text-dark p-4 flex justify-center items-center border-b-4 border-b-red-500 absolute top-0 inset-x-0 translate-x-full transition-all duration-300"
      >
        <p>Erro ao editar tarefa</p>
      </div>
    </div>
  );
}
