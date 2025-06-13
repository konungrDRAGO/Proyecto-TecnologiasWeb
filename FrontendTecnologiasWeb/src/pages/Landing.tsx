import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "@/hooks/useLocation";
import { getAllProducts } from "@/services/productsServices";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
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

export default function Landing() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const location = useLocation();
  const navigate = useNavigate();

  // Cargar productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        const apiProducts = response.productos || [];

        const mappedProducts = apiProducts.map((p: any) => ({
          id: p.id_producto,
          name: `${p.nombre_producto}`,
          price: p.mejor_precio?.precio ?? 0,
          oldPrice: p.mejor_precio?.precio_original ?? 0,
          store: p.mejor_precio?.supermercado?.nombre_supermercado ?? "Desconocido",
          imageUrl: p.imagen_url,
          discount: p.mejor_precio?.descuento ?? 0,
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, itemsPerPage]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

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

      {/* Navegación */}
      <div className="flex justify-center gap-4 mb-6">
        <Button className="bg-[#292F42]" onClick={() => navigate("/")}>Inicio</Button>
        <Button variant="secondary" onClick={() => navigate("/ofertas")}>Ofertas</Button>
        <Button variant="secondary" onClick={() => navigate("/supermercados")}>Supermercados</Button>
      </div>

      {/* Hero */}
      <section className="bg-[#292F42] text-white rounded-xl p-6 text-center mb-10">
        <h1 className="text-2xl font-bold mb-4">
          Encuentra las mejores ofertas de supermercados en Chile
        </h1>
        <div className="py-4 flex justify-center">
          <div className="flex items-center bg-[#f1f1f1] rounded-md w-full sm:w-1/2 shadow-md h-9">
            <Input
              placeholder="Buscar productos"
              className="bg-transparent border-0 text-black placeholder:text-[#a0a0a0] px-4 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              className="h-6 rounded-full bg-[#292F42] text-white px-4 text-xs font-semibold hover:bg-[#1f2533] transition mr-2"
            >
              Buscar
            </Button>
          </div>
        </div>
      </section>

      {/* Listado de productos */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Productos</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Productos por página:</span>
          <Select value={itemsPerPage.toString()} onValueChange={(value) => handleItemsPerPageChange(Number(value))}>
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
