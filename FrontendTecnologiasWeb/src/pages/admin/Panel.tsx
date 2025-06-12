import { useNavigate } from "react-router-dom";

export function Panel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f8ff] dark:bg-background px-4 transition-colors duration-300">
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <button
          onClick={() => navigate("/usuarios")}
          className="bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-xl py-3 px-6 text-center transition"
        >
          Gestión de usuarios
        </button>

        <button
          onClick={() => navigate("/ofertas-reportadas")}
          className="bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-xl py-3 px-6 text-center transition"
        >
          Ofertas reportadas
        </button>
      </div>
    </div>
  );
}
