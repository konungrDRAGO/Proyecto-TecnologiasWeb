import { useLocation } from "react-router-dom";
import { Card} from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useState } from "react";
import { StoreCard } from "@/components/StoreCard";

type PriceInfo = {
  store: string;
  price: number;
  oldPrice?: number;
};

type ProductState = {
  name: string;
  image: string;
  prices: PriceInfo[];
};

export default function Producto() {
    const [liked, setLiked] = useState(false);
    const location = useLocation();
    const state = location.state as ProductState | null;

    if (!state) return <div>Producto no encontrado.</div>;

    const { name, image, prices } = state;

    const bestPrice = prices.reduce((min, p) => (p.price < min.price ? p : min), prices[0]);

    return (
        <div className="min-h-screen p-6 flex flex-col md:flex-row items-center gap-8 w-full justify-center">
            {/* Tarjeta del producto */}
            <Card className="w-full max-w-md p-6 relative dark:bg-gray-700">
            <Heart
                onClick={(e) => {
                    e.stopPropagation();
                    setLiked(!liked);
                }}
                className={`w-5 h-5 absolute top-4 right-4 cursor-pointer ${liked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
                fill={liked ? "currentColor" : "none"}
                />
                <h1 className="text-xl font-bold text-center mb-4">{name}</h1>
                <img src={image} alt={name} className="mx-auto max-h-72 object-contain" />
            </Card>
            {/* Lista de tiendas */}
             <div className="flex flex-col gap-4">
                {prices.map(({ store, price, oldPrice }) => (
                <StoreCard
                    key={store}
                    store={store}
                    price={price}
                    oldPrice={oldPrice}
                    isBest={store === bestPrice.store}
                />
                ))}
            </div>
        </div>
    );
}
