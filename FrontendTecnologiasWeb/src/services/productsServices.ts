import api from "@/api/axiosApi";

export const getAllProducts = async () => {
    const response = await api.get("/productos", {});
    return response.data;
};

export const getOfertasProductos = async (id: Number) => {
    const response = await api.get(`/ofertas/${id}/ofertas`, {});
    console.log(response)
    return response; 
};

export const getSupermercados = async () => {
    const response = await api.get("supermercados", {});
    console.log(response)
    return response; 
};
