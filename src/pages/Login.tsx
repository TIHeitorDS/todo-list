import checkingTask from "../assets/checking_tasks_in_notepad.svg";
import { useForm } from "react-hook-form";
import { User } from "../lib/definitions";
import { login } from "../firebase/database";
import { useLogin } from "../hooks/useLogin";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import loader from "../assets/loader.svg";

export default function Login() {
  const { register, handleSubmit } = useForm<User>();
  const { handleLogin } = useLogin();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function onSubmit(data: User) {
    setIsLoading(true);
    await login(data)
      .then((result) => {
        if (result) {
          handleLogin(result);
          navigate("/");
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="w-full flex flex-col justify-center items-center p-4">
      <img
        src={checkingTask}
        alt="checando bloco de notas"
        className="animate-pulse w-48"
      />

      <p className="mt-6 text-center font-bold text-4xl tracking-widest">
        TODO LIST
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder="E-mail"
            className="mt-4 w-80 dark:bg-dark light:bg-white-secondary p-[10px] rounded-xl outline-0 focus:border dark:focus:border-green light:focus:border-orange"
            {...register("email", {required: true})}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Senha"
            className="mt-4 w-80 dark:bg-dark light:bg-white-secondary p-[10px] rounded-xl outline-0 focus:border dark:focus:border-green light:focus:border-orange"
            {...register("password", {required: true})}
          />
        </div>

        <button
          type="submit"
          className="dark:bg-green light:bg-orange font-medium text-dark p-[10px] rounded-xl w-36 mt-12 flex justify-center items-center mx-auto cursor-pointer hover:opacity-50 transition-opacity"
        >
          {isLoading ? <img src={loader} className="animate-spin" /> : "Entrar"}
        </button>
      </form>

      <p className="mt-8 text-center">
        Não possui uma conta?{" "}
        <Link
          to={"/cadastrar"}
          className="dark:text-green light:text-orange cursor-pointer hover:opacity-50 transition-opacity"
        >
          {" "}
          cadastre-se agora
        </Link>
      </p>
    </div>
  );
}
