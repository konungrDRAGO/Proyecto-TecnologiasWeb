import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useUser } from "@/context/UserContext";

interface ProtectedRouteProps {
  children: ReactNode;
  rolesAllowed: string[];
}

export const ProtectedRoute = ({ children, rolesAllowed }: ProtectedRouteProps) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!rolesAllowed.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
