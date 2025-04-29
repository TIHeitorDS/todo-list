import { Link } from "react-router";
import Navigation from "../components/Navigation";
import InputRadio from "../components/InputRadio";
import { useForm } from "react-hook-form";
import { createTask } from "../firebase/database";
import { Task } from "../lib/definitions";
import { useLogin } from "../hooks/useLogin";
import { useRef } from "react";

export default function CreateTask() {
  const { register, handleSubmit, reset } = useForm<Task>();
  const { authenticatedUser: user } = useLogin();
  const successAlert = useRef<HTMLDivElement>(null);
  const errorAlert = useRef<HTMLDivElement>(null);

  async function onSubmit(data: Task) {
    const response = await createTask(user, data);
    if (response) {
      reset();
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
  }

  return (
    <>
      <Navigation>
        <div className="flex items-center justify-center">
          <Link
            to={"/"}
            className="dark:text-green text-xl cursor-pointer w-9 h-9 flex items-center justify-center rounded-xl light:bg-orange"
          >
            {"<"}
          </Link>
          <p className="font-bold text-xl text-center grow">Criar Tarefa</p>
        </div>
      </Navigation>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-9 mt-16"
      >
        <input
          type="text"
          id="title"
          placeholder="Título da tarefa"
          className="border-b dark:border-dark light:border-orange dark:focus:text-green dark:focus:border-green light:focus:text-orange light:focus:border-orange transition-colors outline-0 py-[10px]"
          {...register("title", { required: true })}
        />

        <div className="space-x-2">
          <label htmlFor="date">Concluir tarefa em </label>
          <input
            type="date"
            id="date"
            className="dark:bg-dark p-[10px] w-fit border-b dark:border-b-green light:border-b-orange outline-0"
            {...register("date", { required: true })}
          />
        </div>
        <div className="flex items-center gap-3">
          <InputRadio register={register} label="Pessoal" id="personal" />
          <InputRadio register={register} label="Trabalho" id="work" />
          <InputRadio register={register} label="Faculdade" id="college" />
        </div>

        <textarea
          id="description"
          className="dark:bg-dark light:bg-white-secondary rounded-xl dark:text-white/50 px-3 py-[10px] ring-0 border-0 focus:outline dark:focus:outline-green light:focus:outline-orange transition-colors"
          placeholder="Descrição"
          {...register("description")}
        ></textarea>

        <button
          type="submit"
          className="dark:bg-green light:bg-orange ml-auto w-fit text-dark font-medium px-4 py-2 rounded-xl cursor-pointer hover:opacity-50 transition-opacity"
        >
          Confirmar
        </button>
      </form>

      <div
        ref={successAlert}
        className="dark:bg-white light:bg-white-secondary font-bold text-lg tracking-wide text-dark p-4 flex justify-center items-center border-b-4 border-b-green absolute top-0 inset-x-0 translate-x-full transition-all duration-300"
      >
        <p>Tarefa criada com sucesso</p>
      </div>

      <div
        ref={errorAlert}
        className="dark:bg-white light:bg-white-secondary font-bold text-lg tracking-wide text-dark p-4 flex justify-center items-center border-b-4 border-b-red-500 absolute top-0 inset-x-0 translate-x-full transition-all duration-300"
      >
        <p>Erro ao criar tarefa</p>
      </div>
    </>
  );
}
