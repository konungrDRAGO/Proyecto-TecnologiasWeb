import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';
import './index.css'
import { ThemeProvider } from './context/ThemeContext.tsx';
import { UserProvider } from "@/context/UserContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserProvider>
  </StrictMode>,
)
