import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";
import { useLocation } from "@/hooks/useLocation";
import { MapPin } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Aceite Maravilla 1L",
    price: 1200,
    oldPrice: 3200,
    store: "Jumbo",
  },
  {
    id: 2,
    name: "Chocapic",
    price: 1000,
    oldPrice: 1500,
    store: "Unimarc",
  },
  {
    id: 3,
    name: "Arroz 1KL",
    price: 850,
    oldPrice: 1200,
    store: "Lider",
  },
];

export default function Landing() {
  const [query, setQuery] = useState("");
  const location = useLocation();

  return (
    <main className="pt-20 px-4 lg:px-20 min-h-screen bg-white dark:bg-background transition-colors duration-300">
      {/* Ubicación */}
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-300" />
        {location
          ? `Tu ubicación: ${location.city}, ${location.region}`
          : "Detectando ubicación..."}
      </div>

      {/* Navegación principal */}
      <div className="flex justify-center gap-4 mb-6">
        <Button variant="secondary">Inicio</Button>
        <Button className="bg-[#292F42] hover:bg-[#1f2533] text-white dark:bg-[#1f2533] dark:hover:bg-[#10141d]">
          Ofertas
        </Button>
        <Button variant="secondary">Supermercados</Button>
      </div>

      {/* Hero principal */}
      <section className="bg-[#292F42] dark:bg-[#1f2533] text-white rounded-xl p-6 text-center mb-10 transition-colors duration-300">
        <h1 className="text-2xl font-bold mb-4">
          Encuentra las mejores ofertas de supermercados en Chile
        </h1>
        
        <div className="py-4 rounded-xl flex justify-center">
          <div className="flex items-center bg-[#f1f1f1] rounded-full overflow-hidden w-full sm:w-[400px] shadow-md h-9">
            <Input
              placeholder="Buscar productos o supermercados"
              className="bg-transparent border-0 text-black placeholder:text-[#a0a0a0] px-4 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              className="h-6 rounded-full bg-[#292F42] text-white px-4 text-xs font-semibold hover:bg-[#1f2533] transition mr-2"
              onClick={() => console.log("Buscar:", query)}
            >
              Buscar
            </Button>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <Button variant="outline" className="text-black dark:text-white hover:bg-gray-800 hover:text-white dark:hover:bg-gray-100 dark:hover:text-black">
            Ofertas
          </Button>
          <Button variant="outline" className="text-black dark:text-white hover:bg-gray-800 hover:text-white dark:hover:bg-gray-100 dark:hover:text-black">
            Todos los supermercados
          </Button>
        </div>
      </section>

      {/* Destacados */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Ofertas destacadas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </main>
  );
}
