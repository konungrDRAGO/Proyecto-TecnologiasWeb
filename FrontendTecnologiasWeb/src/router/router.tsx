import Landing from "@/pages/Landing";
import { createBrowserRouter } from "react-router-dom";
import { LoginForm } from "@/pages/Login";
import MainLayout from "./layout";
import Producto from "@/pages/Producto";

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
    path: "/producto",
    element: (
      <MainLayout>
        <Producto />
      </MainLayout>
    ),
  },
]);
