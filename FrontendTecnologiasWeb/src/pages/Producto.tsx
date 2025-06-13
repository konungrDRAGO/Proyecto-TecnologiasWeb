import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { StoreCard } from "@/components/StoreCard";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { getOfertasProductos } from "@/services/productsServices";

interface PriceInfo {
  supermercado: {
    id_supermercado: number;
    nombre_supermercado: string;
  };
  lat: number | null;
  lng: number | null;
  precio_oferta: number;
  precio_original: number;
}

interface ProductData {
  nombre_producto: string;
  imagen_url: string;
  ofertas: PriceInfo[];
}

export default function Producto() {
  const [liked, setLiked] = useState(false);
  const { id } = useParams();
  const { user } = useUser();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [prices, setPrices] = useState<PriceInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOfertasProductos(Number(id));
        if (response?.data) {
          setProduct(response.data.producto);
          setPrices(response.data.ofertas || []);
        }
      } catch (err) {
        console.error("Error al obtener ofertas del producto:", err);
      }
    };

    fetchData();
  }, [id]);

  const bestPrice = prices.length > 0
    ? prices.reduce((prev, curr) => (curr.precio_oferta < prev.precio_oferta ? curr : prev), prices[0])
    : null;

  return (
    <div className="min-h-screen p-6 flex flex-col md:flex-row items-center gap-8 w-full justify-center">
      {/* Tarjeta del producto */}
      <Card className="w-full max-w-md p-6 relative dark:bg-gray-700 items-center">
        <Heart
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className={`w-5 h-5 absolute top-4 right-4 cursor-pointer ${liked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
          fill={liked ? "currentColor" : "none"}
        />
        {product ? (
          <>
            <h1 className="text-xl font-bold text-center mb-4">{product.nombre_producto}</h1>
            {product.imagen_url && (
              <img src={"/chocapic.png"} alt={product.nombre_producto} className="mx-auto max-h-72 object-contain" />
            )}
            {user?.role !== "LECTURA" && (
              <Button className="bg-[#DC3545] w-fit">Reportar Producto</Button>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">Cargando producto...</p>
        )}
      </Card>

      {/* Lista de tiendas */}
      <div className="flex flex-col gap-4">
        {prices.map(({ supermercado, precio_oferta, precio_original, lat, lng }) => (
          <StoreCard
            key={supermercado.id_supermercado}
            store={supermercado.nombre_supermercado}
            price={precio_oferta}
            oldPrice={precio_original}
            isBest={bestPrice?.supermercado.id_supermercado === supermercado.id_supermercado}
            lat={lat ?? -34.992401564416326}
            lng={lng ?? -71.234822002877}
          />
        ))}
      </div>
    </div>
  );
}
