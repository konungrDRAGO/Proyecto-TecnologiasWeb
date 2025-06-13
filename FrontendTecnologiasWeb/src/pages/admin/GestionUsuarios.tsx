import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { CambiarRolModal } from "@/components/CambiarRolModal";
import { Button } from "@/components/ui/button";
import { actualizarRolUsuario, getUsuarios } from "@/services/usuarioServices";

type Usuario = {
  id_usuario: number;
  nombre_completo: string;
  email: string;
  rol: string;
  fecha_registro?: string;
};

export function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);

  const itemsPerPage = 10;

  const fetchUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const filteredUsers = usuarios.filter((user) =>
    user.nombre_completo.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleRoleChange = async (id: number, nuevoRol: string) => {
    try {
      await actualizarRolUsuario(id, nuevoRol);
      setUsuarios((prev) =>
        prev.map((user) =>
          user.id_usuario === id ? { ...user, rol: nuevoRol } : user
        )
      );
      setSelectedUser(null);
    } catch (error) {
      console.error("Error actualizando rol:", error);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-[#f4f8ff] dark:bg-background px-4 py-10 transition-colors duration-300">
      <div className="flex flex-col items-start space-y-4 max-w-3xl mx-auto">
        <div className="mb-2 w-full flex justify-center text-2xl font-semibold">
          Gestión de Usuarios
        </div>

        <Input
          placeholder="Buscar usuario por nombre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[#E0E3EA]"
        />

        <Table className="w-full bg-white dark:bg-[#1f2937] rounded-xl shadow overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="text-center">Rol</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id_usuario}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src="" alt={user.nombre_completo} />
                    <AvatarFallback>{user.nombre_completo[0]}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                  {user.nombre_completo}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    onClick={() => setSelectedUser(user)}
                    className="rounded-xl bg-[#A0A0A0] w-32"
                  >
                    {user.rol}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
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
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {selectedUser && (
        <CambiarRolModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleRoleChange}
        />
      )}
    </div>
  );
}
