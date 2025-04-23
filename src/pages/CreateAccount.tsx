import { useForm } from "react-hook-form";
import { User } from "../lib/definitions";
import { Link } from "react-router";
import { createUser } from "../firebase/database";
import { useRef } from "react";

export default function CreateAccount() {
  const { register, handleSubmit, reset } = useForm<User>();
  const successAlert = useRef<HTMLDivElement>(null);
  const errorAlert = useRef<HTMLDivElement>(null);

  async function onSubmit(data: User) {
    const response = await createUser(data);

    if (response) {
      reset();
      if (successAlert.current) {
        successAlert.current.classList.remove("translate-x-full");
        successAlert.current.classList.add("translate-x-0");
        setTimeout(() => {
          successAlert.current?.classList.remove("translate-x-0");
          successAlert.current?.classList.add("translate-x-full");
        }, 3000);
      }
    } else {
      if (errorAlert.current) {
        errorAlert.current.classList.remove("translate-x-full");
        errorAlert.current.classList.add("translate-x-0");
        setTimeout(() => {
          errorAlert.current?.classList.remove("translate-x-0");
          errorAlert.current?.classList.add("translate-x-full");
        }, 3000);
      }
    }
  }

  return (
    <div className="relative overflow-hidden w-full flex flex-col justify-center items-center p-4">
      <p className="mt-6 text-center font-bold text-4xl tracking-widest">
        CRIE SUA CONTA AGORA
      </p>
      <p className="text-center opacity-50 mt-2">
        Preencha os dados abaixo para se cadastrar
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Nome completo"
            className="mt-4 w-80 bg-dark p-[10px] rounded-xl outline-0 focus:border focus:border-green"
            {...register("name", { required: true })}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="E-mail"
            className="mt-4 w-80 bg-dark p-[10px] rounded-xl outline-0 focus:border focus:border-green"
            {...register("email", { required: true })}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Senha"
            className="mt-4 w-80 bg-dark p-[10px] rounded-xl outline-0 focus:border focus:border-green"
            {...register("password", { required: true })}
          />
        </div>

        <div className="flex justify-center items-center mt-12">
          <Link
            to="/login"
            className="border border-green rounded-xl p-[10px] w-36 block text-center hover:opacity-50 transition-opacity"
          >
            Voltar
          </Link>
          <button
            type="submit"
            className="bg-green text-dark p-[10px] rounded-xl w-36 flex justify-center items-center mx-auto cursor-pointer hover:opacity-50 transition-opacity"
          >
            Criar conta
          </button>
        </div>
      </form>

      <div
        ref={successAlert}
        className="bg-white font-bold text-lg tracking-wide text-dark p-4 flex justify-center items-center border-b-4 border-b-green absolute top-0 inset-x-0 translate-x-full transition-all duration-300"
      >
        <p>Conta criada com sucesso</p>
      </div>

      <div
        ref={errorAlert}
        className="bg-white font-bold text-lg tracking-wide text-dark p-4 flex justify-center items-center border-b-4 border-b-red-500 absolute top-0 inset-x-0 translate-x-full transition-all duration-300"
      >
        <p>Erro ao criar sua conta</p>
      </div>
    </div>
  );
}
