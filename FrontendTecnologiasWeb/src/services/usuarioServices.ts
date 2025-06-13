import api from "@/api/axiosApi";

export const registrarUsuario = async (email:string, nombre_completo:string, rol:string, contrasena:string) => {
  const response = await api.post("/usuarios", {
    email,
    nombre_completo,
    rol,
    contrasena,
  });

  return response.data; 
};

export const loginUsuario = async (email: string, contrasena: string) => {
  const response = await api.post("/usuarios/login", {
    email,
    contrasena,
  });
  console.log(response)
  return response.data;
};

export const actualizarRolUsuario = async (id_usuario: number, nuevoRol: string) => {
    const response = await api.patch(`/usuarios/${id_usuario}/rol`, {
    rol: nuevoRol,
    });

    return response.data.usuario; 
};

export const getUsuarios = async () => {
    const response = await api.get("/usuarios", {});
    return response.data;
};
