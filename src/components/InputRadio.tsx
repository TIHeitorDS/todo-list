import { UseFormRegister } from "react-hook-form";
import { Task } from "../lib/definitions";

export default function InputRadio({
  label,
  id,
  register,
}: {
  label: string;
  id: string;
  register: UseFormRegister<Task>;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-1 cursor-pointer text-xs"
    >
      <input
        type="radio"
        id={id}
        className="peer hidden"
        value={label}
        {...register("category")}
      />
      <div className="w-4 h-4 rounded-full bg-dark border border-green peer-checked:bg-green transition-all"></div>
      {label}
    </label>
  );
}
