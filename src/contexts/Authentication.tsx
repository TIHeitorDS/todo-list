import { createContext, useState } from "react";
import { User } from "../lib/definitions";

interface UserContextType {
  user: User | undefined;
  handleLogin: (user: User | undefined) => void;
}

export const UserContext = createContext<UserContextType>({
  user: undefined,
  handleLogin: () => {},
});

export default function Authentication({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>();

  function handleLogin(user: User | undefined) {
    setUser(user);
  }

  return (
    <UserContext.Provider value={{ user, handleLogin }}>
      {children}
    </UserContext.Provider>
  );
}
