import { useNavigate } from "react-router-dom";

interface SuperCardProps {
  store: string;
  activeOffers: number;
  branches: number;
  lastUpdate: string;
}

export const SuperCard = ({ store, activeOffers, branches, lastUpdate }: SuperCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/ofertas", {
      state: {
        store,
      },
    });
  };

  return (
    <div className="bg-white dark:bg-[#1f2533] rounded-xl shadow-md overflow-hidden w-64">
      {/* Encabezado verde */}
      <div className="bg-green-600 text-white text-center py-4 text-xl font-bold">
        {store}
      </div>
      
      {/* Contenido */}
      <div className="p-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-500 dark:text-gray-400">
          <span>Ofertas activas</span>
          <span className="text-green-600 font-medium">{activeOffers} ofertas</span>
        </div>
        <div className="flex justify-between text-gray-500 dark:text-gray-400">
          <span>Sucursales</span>
          <span className="text-black dark:text-white font-semibold">{branches} tiendas</span>
        </div>
        <div className="flex justify-between text-gray-500 dark:text-gray-400">
          <span>Última actualización</span>
          <span className="text-green-600">{lastUpdate}</span>
        </div>
      </div>

      {/* Botón */}
      <div className="px-4 pb-4">
        <button
          onClick={handleClick}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md text-sm font-medium transition"
        >
          Ver Ofertas
        </button>
      </div>
    </div>
  );
};
