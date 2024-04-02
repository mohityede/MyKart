import { ReactElement } from "react";
import { User } from "./types";

export interface HeaderProps {
  user: User | null;
}

export interface ProtectedProps {
  isAuthenticated: boolean;
  isAdmin?: boolean;
  isAdminRoute?: boolean;
  children?: ReactElement;
  redirect?: string;
}
