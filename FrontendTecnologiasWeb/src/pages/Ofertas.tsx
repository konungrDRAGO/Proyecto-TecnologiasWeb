import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";
import { useLocation } from "@/hooks/useLocation";
import { MapPin, Tag } from "lucide-react";
import { useEffect } from "react";
import { useLocation as useRouterLocation } from "react-router-dom";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useNavigate } from "react-router-dom";

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
  {
    id: 4,
    name: "Arroz 1KL",
    price: 850,
    oldPrice: 1200,
    store: "Lider",
  },
  {
    id: 5,
    name: "Aceite Maravilla 1L",
    price: 1200,
    oldPrice: 3200,
    store: "Jumbo",
  },
  {
    id: 6,
    name: "Chocapic",
    price: 1000,
    oldPrice: 1500,
    store: "Unimarc",
  },
  {
    id: 7,
    name: "Arroz 1KL",
    price: 850,
    oldPrice: 1200,
    store: "Lider",
  },
  {
    id: 8,
    name: "Arroz 1KL",
    price: 850,
    oldPrice: 1200,
    store: "Lider",
  },
  {
    id: 9,
    name: "Aceite Maravilla 1L",
    price: 1200,
    oldPrice: 3200,
    store: "Jumbo",
  },
  {
    id: 10,
    name: "Chocapic",
    price: 1000,
    oldPrice: 1500,
    store: "Unimarc",
  },
  {
    id: 11,
    name: "Arroz 1KL",
    price: 850,
    oldPrice: 1200,
    store: "Lider",
  },
  {
    id: 12,
    name: "Arroz 1KL",
    price: 850,
    oldPrice: 1200,
    store: "Lider",
  },
  {
    id: 13,
    name: "Aceite Maravilla 1L",
    price: 1200,
    oldPrice: 3200,
    store: "Jumbo",
  },
  {
    id: 14,
    name: "Chocapic",
    price: 1000,
    oldPrice: 1500,
    store: "Unimarc",
  },
  {
    id: 15,
    name: "Arroz 1KL",
    price: 850,
    oldPrice: 1200,
    store: "Lider",
  },

];

export default function Ofertas() {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    if (routerLocation.state?.store) {
      setSelectedMarket(routerLocation.state.store);
    }
  }, [routerLocation.state]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedMarket, setSelectedMarket] = useState("Todos los Supermercados");


  const filteredProducts = products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
    const matchesMarket =
      selectedMarket === "Todos los Supermercados" || product.store === selectedMarket;
    return matchesQuery && matchesMarket;
  });

  const uniqueMarkets = [
    "Todos los Supermercados",
    ...Array.from(new Set(products.map((p) => p.store)))
  ];

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

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
        <Button variant="secondary" onClick={() => navigate('/')}>Inicio</Button>
        <Button className="bg-[#292F42] hover:bg-[#1f2533] text-white dark:bg-[#1f2533] dark:hover:bg-[#10141d]" onClick={() => navigate('/ofertas')}>
          Ofertas
        </Button>
        <Button variant="secondary" onClick={() => navigate('/supermercados')}>Supermercados</Button>
      </div>
      {/* Hero principal */}
      <div className="bg-[#292F42] dark:bg-[#1f2533] text-white rounded-xl p-6 text-center mb-10 transition-colors duration-300 w-full">
        <h1 className="text-2xl font-bold mb-4 w-full justify-center flex flex-row items-center">
          <Tag className="mr-2" style={{ transform: "scaleX(-1)" }} /> Todas las Ofertas
        </h1>
        <div className="flex flex-row justify-center">
          <div className="py-4 rounded-xl w-1/2 flex start">
            <div className="flex items-center bg-[#f1f1f1] rounded-md overflow-hidden w-full mr-4 shadow-md h-9 ml-4">
              <Input
                placeholder="Buscar productos"
                className="bg-transparent border-0 text-black placeholder:text-[#a0a0a0] px-4 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-full w-full"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={selectedMarket}
              onValueChange={(value) => {
                setSelectedMarket(value);
                setCurrentPage(1); 
              }}
            >
              <SelectTrigger className="w-fit min-w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {uniqueMarkets.map((market) => (
                  <SelectItem key={market} value={market}>
                    {market}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {/* Destacados */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Ofertas destacadas
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Productos por página:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) =>  {
              setItemsPerPage(Number(value));
              setCurrentPage(1);  
            }}         
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="36">36</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
            Ningún producto coincide con el criterio de búsqueda :c
          </div>
        )}
      </div>
     <Pagination className="mt-8 mb-8">
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {/* Pages: mostrar 1, actual-1, actual, actual+1, última con puntos si aplica */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) =>
              page === 1 ||
              page === currentPage - 1 ||
              page === currentPage ||
              page === currentPage + 1 ||
              page === totalPages
            )
            .reduce((acc: number[], page, i, arr) => {
              if (i > 0 && page - arr[i - 1] > 1) acc.push(-1); // -1 = ellipsis
              acc.push(page);
              return acc;
            }, [])
            .map((page, index) =>
              page === -1 ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                    className="min-w-8 text-center"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
          {/* Next */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
