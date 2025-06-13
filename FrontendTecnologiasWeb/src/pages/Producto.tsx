import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useState } from "react";
import { StoreCard } from "@/components/StoreCard";

type PriceInfo = {
  store: string;
  lat: number;
  lng: number;
  price: number;
  oldPrice?: number;
};

export default function Producto() {
  const [liked, setLiked] = useState(false);
  const { id } = useParams();

  // Mock de datos del producto
  const name = "Chocapic";
  const image = "/chocapic.png";
  const prices: PriceInfo[] = [
    { store: "Unimarc", price: 1000, oldPrice: 1500, lat: -34.9849009597703, lng: -71.234822002877 },
    { store: "Jumbo", price: 1500, lat: -34.992401564416326, lng: -71.24478083356088 },
    { store: "Lider", price: 1490, lat: -34.977487716408646, lng: -71.23921257368347 },
  ];

  const bestPrice = prices.reduce((prev, curr) => (curr.price < prev.price ? curr : prev), prices[0]);

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
        {prices.map(({ store, price, oldPrice, lat, lng }) => (
          <StoreCard
            key={store}
            store={store}
            price={price}
            oldPrice={oldPrice}
            isBest={store === bestPrice.store}
            lat={lat}
            lng={lng}
          />
        ))}
      </div>
    </div>
  );
}
