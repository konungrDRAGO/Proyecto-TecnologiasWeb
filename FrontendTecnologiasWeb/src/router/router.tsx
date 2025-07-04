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
import { OfertasReportadas } from "@/pages/admin/OfertasReportadas";

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
      <ProtectedRoute rolesAllowed={["ADMINISTRADOR", "USUARIO", "LECTURA"]}>
        <MainLayout>
          <Landing />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/producto/:id",
    element: (
      <ProtectedRoute rolesAllowed={["ADMINISTRADOR", "USUARIO", "LECTURA"]}>
        <MainLayout>
          <Producto />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/ofertas",
    element: (
      <ProtectedRoute rolesAllowed={["ADMINISTRADOR", "USUARIO", "LECTURA"]}>
        <MainLayout>
          <Ofertas />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/supermercados",
    element: (
      <ProtectedRoute rolesAllowed={["ADMINISTRADOR", "USUARIO", "LECTURA"]}>
        <MainLayout>
          <Supermercados />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute rolesAllowed={["ADMINISTRADOR", "MODERADOR"]}>
        <AdminLayout>
          <Panel />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/usuarios",
    element: (
      <ProtectedRoute rolesAllowed={["ADMINISTRADOR"]}>
        <AdminLayout>
          <GestionUsuarios />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/ofertas-reportadas",
    element: (
      <ProtectedRoute rolesAllowed={["ADMINISTRADOR", "MODERADOR"]}>
        <AdminLayout>
          <OfertasReportadas />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
]);
