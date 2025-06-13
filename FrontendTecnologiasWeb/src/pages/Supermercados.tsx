import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SuperCard } from "@/components/SuperCard";
import { useState, useEffect, useMemo } from "react"; // Added useMemo
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
import { getSupermercados } from "@/services/productsServices";

interface Supermercado {
  id_supermercado: number;
  nombre_supermercado: string;
  direccion: string | null;
  url_sitio_web: string;
  _count: {
    ofertas: number;
  };
  region?: string; // region is optional based on your comment, but good to have if available
}

export default function Supermercados() {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const [supermarkets, setSupermarkets] = useState<Supermercado[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedRegion, setSelectedRegion] = useState("Todas las regiones");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSupermercados();
        // Assuming the API response might include a region.
        // If not, you'd need a way to determine regions,
        // e.g., mapping addresses to regions or another API call.
        const data = res.data.map((s: Supermercado) => ({
          ...s,
          region: s.region || "Región Desconocida", // Use actual region if available, otherwise default
        }));
        setSupermarkets(data);
      } catch (err) {
        console.error("Error al obtener supermercados", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedRegion]); // Reset page when query or region changes

  // Use useMemo to re-calculate uniqueRegions only when 'supermarkets' changes
  const uniqueRegions = useMemo(() => {
    const regions = new Set<string>();
    supermarkets.forEach((s) => {
      if (s.region) {
        regions.add(s.region);
      }
    });
    return ["Todas las regiones", ...Array.from(regions)];
  }, [supermarkets]);

  const filteredMarkets = useMemo(() => {
    return supermarkets.filter((market) => {
      const matchesQuery = market.nombre_supermercado
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesRegion =
        selectedRegion === "Todas las regiones" ||
        market.region === selectedRegion;
      return matchesQuery && matchesRegion;
    });
  }, [supermarkets, query, selectedRegion]);

  const totalPages = Math.ceil(filteredMarkets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMarkets = filteredMarkets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
        <Button variant="secondary" onClick={() => navigate("/")}>
          Inicio
        </Button>
        <Button variant="secondary" onClick={() => navigate("/ofertas")}>
          Ofertas
        </Button>
        <Button
          className="bg-[#292F42] hover:bg-[#1f2533] text-white dark:bg-[#1f2533] dark:hover:bg-[#10141d]"
          onClick={() => navigate("/supermercados")}
        >
          Supermercados
        </Button>
      </div>

      {/* Hero */}
      <div className="bg-[#292F42] dark:bg-[#292F42] text-white rounded-xl p-6 text-center mb-10 transition-colors duration-300 w-full">
        <h1 className="text-2xl font-bold mb-4 w-full justify-center flex flex-row items-center">
          <Store className="mr-2" style={{ transform: "scaleX(-1)" }} />{" "}
          Supermercados Disponibles
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
          <span className="text-sm text-muted-foreground">
            Supermercados por página:
          </span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
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
              key={market.id_supermercado}
              store={market.nombre_supermercado}
              activeOffers={market._count.ofertas}
              branches={0} // Replace with actual branches if available
              lastUpdate="N/A" // Replace with actual last update if available
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
            .filter(
              (page) =>
                page === 1 ||
                page === currentPage - 1 ||
                page === currentPage ||
                page === currentPage + 1 ||
                page === totalPages
            )
            .reduce((acc: (number | string)[], page, i) => {
              if (i > 0 && typeof acc[acc.length - 1] === 'number' && page - (acc[acc.length - 1] as number) > 1) {
                acc.push("ellipsis"); // Use a string to indicate ellipsis
              }
              acc.push(page);
              return acc;
            }, [])
            .map((page, index) =>
              page === "ellipsis" ? (
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
                      setCurrentPage(page as number);
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
              className={
                currentPage === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}