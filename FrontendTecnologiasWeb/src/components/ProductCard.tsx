import { Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  name: string;
  id:any;
  price: number;
  oldPrice: number;
  store: string;
}

export const ProductCard = ({ name, price, oldPrice, store,id }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
      navigate(`/producto/${id}`);
    /*
    navigate("/producto", {
    state: {
        name: "Chocapic",
        image: "/chocapic.png",
        prices: [
        { store: "Unimarc", price: 1000, oldPrice: 1500 , lat: -34.9849009597703, lng:-71.234822002877 },
        { store: "Jumbo", price: 1500 ,lat: -34.992401564416326,  lng:-71.24478083356088 },
        { store: "Lider", price: 1490,lat: -34.977487716408646, lng: -71.23921257368347 },
        ],
    },
    });
    */
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-[#1f2533] rounded-xl shadow-xl p-4 flex flex-col gap-2 cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-[#292F42]"
    >
      <div className="bg-gray-100 dark:bg-[#2c2f4a] h-32 rounded-md flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        Imagen del Producto
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">{store}</div>
      <div className="font-semibold text-gray-800 dark:text-gray-100">{name}</div>
      <div className="flex items-center gap-2">
        <span className="text-green-600 font-bold text-lg">${price.toLocaleString()}</span>
        <span className="text-gray-400 line-through text-sm">${oldPrice.toLocaleString()}</span>
      </div>
      <div className="mt-auto flex justify-end">
        <Heart
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className={`w-5 h-5 cursor-pointer ${liked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
          fill={liked ? "currentColor" : "none"}
        />
      </div>
    </div>
  );
};
