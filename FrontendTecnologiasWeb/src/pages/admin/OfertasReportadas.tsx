import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type Reporte = {
  id_reporte: number;
  producto: string; 
  usuario: string;
  motivo: string;
  fecha_reporte: string;
  estado_reporte: string;
  id_prod: number;
};

const reportesMock: Reporte[] = [
  {
    id_reporte: 1,
    id_prod: 101,
    producto: "Tomates",
    usuario: "Juan Pérez",
    motivo: "Oferta engañosa",
    fecha_reporte: "2025-06-01",
    estado_reporte: "pendiente",
  },
  {
    id_reporte: 2,
    id_prod: 102,
    producto: "Lechugas",
    usuario: "Ana Torres",
    motivo: "Precio incorrecto",
    fecha_reporte: "2025-06-05",
    estado_reporte: "revisado_valida",
  },
];

export function OfertasReportadas() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const filteredReports = reportesMock.filter((reporte) =>
        reporte.producto.toLowerCase().includes(query.toLowerCase())
    );

    const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedReports = filteredReports.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    return (
        <div className="min-h-screen pt-20 bg-[#f4f8ff] dark:bg-background px-4 py-10 transition-colors duration-300">
        <div className="flex flex-col items-start space-y-4 max-w-5xl mx-auto">
            <div className="mb-2 w-full flex justify-center text-2xl font-semibold">Ofertas Reportadas</div>
            <Input
            placeholder="Buscar reporte por producto..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#E0E3EA]"
            />
            <Table className="w-full bg-white dark:bg-[#1f2937] rounded-xl shadow overflow-hidden">
            <TableHeader>
            <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {paginatedReports.map((reporte) => (
                <TableRow key={reporte.id_reporte}>
                <TableCell>{reporte.producto}</TableCell>
                <TableCell>{reporte.usuario}</TableCell>
                <TableCell>{reporte.motivo}</TableCell>
                <TableCell>{new Date(reporte.fecha_reporte).toLocaleDateString()}</TableCell>
                <TableCell>
                    <span className="px-3 py-1 rounded-xl bg-gray-300 dark:bg-gray-700 text-sm capitalize">
                    {reporte.estado_reporte}
                    </span>
                </TableCell>
                <TableCell>
                    <Button
                    className="bg-blue-600 text-white rounded-lg px-3 py-1"
                    onClick={() => navigate(`/oferta/${reporte.id_prod}`)}
                    >
                    Revisar
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
            </Table>

            {/* PAGINACIÓN */}
            <Pagination className="mt-6">
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
        </div>
        </div>
    );
}
