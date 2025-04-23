import { useContext } from "react";
import { UserContext } from "../contexts/Authentication";

export function useLogin() {
  return useContext(UserContext);
}
