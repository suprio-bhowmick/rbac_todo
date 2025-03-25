"use client";
import { useState, ReactNode, useEffect } from "react";
import { ThemeContext } from "./RoleContext";
import { AppAbility, defineAbilityFor } from "@/lib/ability";
import { Ability } from "@casl/ability";

type User = {
  name: string;
  role: string;
} | null;

// Define the props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({
    name: "GUEST",
    role: "guest",
  });
  const [ability, setAbility] = useState<AppAbility>(new Ability());

  useEffect(() => {
    if (user) {
      setAbility(defineAbilityFor(user.role));
    }
  }, [user]);

  const changeRole = (role: string) => {
    let newRole = {
      name: role.toUpperCase(),
      role: role,
    };
    setUser(newRole);
  };

  return (
    <ThemeContext.Provider value={{ user, ability, changeRole }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default AuthProvider;
