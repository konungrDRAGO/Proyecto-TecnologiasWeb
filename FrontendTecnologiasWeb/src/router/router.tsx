import Landing from "@/pages/Landing";
import { createBrowserRouter } from "react-router-dom";
import { LoginForm } from "@/pages/Login";
import MainLayout from "./layout";
import Producto from "@/pages/Producto";
import { RegisterForm } from "@/pages/Register";
import Ofertas from "@/pages/Ofertas";
import Supermercados from "@/pages/Supermercados";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <Landing />
      </MainLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <MainLayout>
        <LoginForm />
      </MainLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <MainLayout>
        <RegisterForm/>
      </MainLayout>
    ),
  },
  {
    path: "/producto",
    element: (
      <MainLayout>
        <Producto />
      </MainLayout>
    ),
  },
  {
    path: "/ofertas",
    element: (
      <MainLayout>
        <Ofertas />
      </MainLayout>
    ),
  },
  {
    path: "/supermercados",
    element: (
      <MainLayout>
        <Supermercados />
      </MainLayout>
    ),
  },
]);
