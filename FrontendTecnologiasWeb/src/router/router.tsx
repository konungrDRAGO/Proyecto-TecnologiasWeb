import { createBrowserRouter } from "react-router-dom";
import Landing from "@/pages/Landing";
import { LoginForm } from "@/pages/Login";
import { RegisterForm } from "@/pages/Register";
import Producto from "@/pages/Producto";
import Ofertas from "@/pages/Ofertas";
import Supermercados from "@/pages/Supermercados";
import { Panel } from "@/pages/admin/Panel";
import { GestionUsuarios } from "@/pages/admin/GestionUsuarios";
import MainLayout from "./layout";
import AdminLayout from "./layoutAdmin";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />, 
  },
  {
    path: "/",
    element: (
      <ProtectedRoute rolesAllowed={["admin", "user"]}>
        <MainLayout>
          <Landing />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/producto",
    element: (
      <ProtectedRoute rolesAllowed={["admin", "user"]}>
        <MainLayout>
          <Producto />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/ofertas",
    element: (
      <ProtectedRoute rolesAllowed={["admin", "user"]}>
        <MainLayout>
          <Ofertas />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/supermercados",
    element: (
      <ProtectedRoute rolesAllowed={["admin", "user"]}>
        <MainLayout>
          <Supermercados />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute rolesAllowed={["admin"]}>
        <AdminLayout>
          <Panel />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/usuarios",
    element: (
      <ProtectedRoute rolesAllowed={["admin"]}>
        <AdminLayout>
          <GestionUsuarios />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
]);
