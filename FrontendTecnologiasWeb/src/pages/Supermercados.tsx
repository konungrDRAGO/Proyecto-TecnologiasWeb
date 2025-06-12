import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SuperCard } from "@/components/SuperCard"; // Asegúrate de tener este componente adaptado
import { useState, useEffect } from "react";
import { useLocation } from "@/hooks/useLocation";
import { MapPin, Store } from "lucide-react";
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
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const supermarkets = [
  {
    id: 1,
    name: "Jumbo",
    activeOffers: 184,
    branches: 89,
    lastUpdate: "Hace 3 horas",
    region: "Región Metropolitana",
  },
  {
    id: 2,
    name: "Lider",
    activeOffers: 102,
    branches: 75,
    lastUpdate: "Hace 1 hora",
    region: "Región de Valparaíso",
  },
  {
    id: 3,
    name: "Unimarc",
    activeOffers: 90,
    branches: 61,
    lastUpdate: "Hace 2 horas",
    region: "Región del Biobío",
  },
  {
    id: 4,
    name: "Tottus",
    activeOffers: 120,
    branches: 48,
    lastUpdate: "Hace 30 minutos",
    region: "Región Metropolitana",
  },
  {
    id: 5,
    name: "Santa Isabel",
    activeOffers: 70,
    branches: 40,
    lastUpdate: "Hace 4 horas",
    region: "Región de Coquimbo",
  },
  {
    id: 6,
    name: "Acuenta",
    activeOffers: 45,
    branches: 32,
    lastUpdate: "Hace 5 horas",
    region: "Región de Valparaíso",
  },
  {
    id: 7,
    name: "OK Market",
    activeOffers: 60,
    branches: 20,
    lastUpdate: "Hace 1 hora",
    region: "Región de Antofagasta",
  },
  {
    id: 8,
    name: "Alvi",
    activeOffers: 38,
    branches: 25,
    lastUpdate: "Hace 2 horas",
    region: "Región de La Araucanía",
  },
  {
    id: 9,
    name: "Mayorista 10",
    activeOffers: 55,
    branches: 18,
    lastUpdate: "Hace 3 horas",
    region: "Región del Maule",
  },
  {
    id: 10,
    name: "Erbi",
    activeOffers: 22,
    branches: 10,
    lastUpdate: "Hace 6 horas",
    region: "Región de Los Lagos",
  },
];

export default function Supermercados() {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedRegion, setSelectedRegion] = useState("Todas las regiones");

  const uniqueRegions = [
    "Todas las regiones",
    ...Array.from(new Set(supermarkets.map((s) => s.region))),
  ];

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const filteredMarkets = supermarkets.filter((market) => {
    const matchesQuery = market.name.toLowerCase().includes(query.toLowerCase());
    const matchesRegion =
      selectedRegion === "Todas las regiones" || market.region === selectedRegion;
    return matchesQuery && matchesRegion;
  });

  const totalPages = Math.ceil(filteredMarkets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMarkets = filteredMarkets.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className="pt-20 px-4 lg:px-20 min-h-screen bg-white dark:bg-background transition-colors duration-300">
      {/* Ubicación */}
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-300" />
        {location
          ? `Tu ubicación: ${location.city}, ${location.region}`
          : "Detectando ubicación..."}
      </div>

      {/* Navegación */}
      <div className="flex justify-center gap-4 mb-6">
        <Button variant="secondary" onClick={() => navigate('/')}>Inicio</Button>
        <Button variant="secondary" onClick={() => navigate('/ofertas')}>Ofertas</Button>
        <Button className="bg-[#292F42] hover:bg-[#1f2533] text-white dark:bg-[#1f2533] dark:hover:bg-[#10141d]" onClick={() => navigate('/supermercados')}>Supermercados</Button>
      </div>

      {/* Hero */}
      <div className="bg-[#292F42] dark:bg-[#292F42] text-white rounded-xl p-6 text-center mb-10 transition-colors duration-300 w-full">
        <h1 className="text-2xl font-bold mb-4 w-full justify-center flex flex-row items-center">
          <Store className="mr-2" style={{ transform: "scaleX(-1)" }} /> Supermercados Disponibles
        </h1>
        <div className="flex flex-row justify-center">
          <div className="py-4 rounded-xl w-1/2 flex start">
            <div className="flex items-center bg-[#f1f1f1] rounded-md overflow-hidden w-full mr-4 shadow-md h-9 ml-4">
              <Input
                placeholder="Buscar supermercados"
                className="bg-transparent border-0 text-black placeholder:text-[#a0a0a0] px-4 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-full w-full"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={selectedRegion}
              onValueChange={(value) => {
                setSelectedRegion(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-fit min-w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {uniqueRegions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Supermercados
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Supermercados por página:</span>
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
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="16">16</SelectItem>
              <SelectItem value="32">32</SelectItem>
              <SelectItem value="48">48</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Grid de supermercados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
        {paginatedMarkets.length > 0 ? (
          paginatedMarkets.map((market) => (
            <SuperCard
              key={market.id}
              store={market.name}
              activeOffers={market.activeOffers}
              branches={market.branches}
              lastUpdate={market.lastUpdate}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
            Ningún supermercado coincide con el criterio de búsqueda :c
          </div>
        )}
      </div>
      {/* Paginación */}
      <Pagination className="mt-8 mb-8">
        <PaginationContent>
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
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) =>
              page === 1 ||
              page === currentPage - 1 ||
              page === currentPage ||
              page === currentPage + 1 ||
              page === totalPages
            )
            .reduce((acc: number[], page, i, arr) => {
              if (i > 0 && page - arr[i - 1] > 1) acc.push(-1);
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
