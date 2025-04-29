import { createContext, useState } from "react";
import { User } from "../lib/definitions";

interface UserContextType {
  authenticatedUser: User | undefined;
  handleLogin: (user: User | undefined) => void;
}

export const UserContext = createContext<UserContextType>({
  authenticatedUser: undefined,
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
    <UserContext.Provider value={{ authenticatedUser: user, handleLogin }}>
      {children}
    </UserContext.Provider>
  );
}
