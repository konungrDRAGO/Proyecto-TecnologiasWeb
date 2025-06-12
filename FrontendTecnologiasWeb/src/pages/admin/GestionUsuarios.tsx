import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { CambiarRolModal } from "@/components/CambiarRolModal"; 
import { Button } from "@/components/ui/button";

type Usuario = {
  id: number;
  name: string;
  avatarUrl?: string;
  role: string;
};

const usuariosMock: Usuario[] = [
  { id: 1, name: "Juan Pérez", role: "administrador" },
  { id: 2, name: "María López", role: "usuario" },
  { id: 3, name: "Carlos Díaz", role: "soporte" },
  { id: 4, name: "Ana Torres", role: "user" },
  { id: 5, name: "Luis Ramírez", role: "admin" },
  { id: 6, name: "Laura Gómez", role: "user" },
  { id: 7, name: "Pedro Castro", role: "user" },
  { id: 8, name: "Sofía Rojas", role: "moderator" },
  { id: 9, name: "Martín Ruiz", role: "admin" },
  { id: 10, name: "Julia Martínez", role: "user" },
  { id: 11, name: "Felipe Herrera", role: "user" },
];

export function GestionUsuarios() {

    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);

    const itemsPerPage = 10;

    const filteredUsers = usuariosMock.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    return (
        <div className="min-h-screen pt-20 bg-[#f4f8ff] dark:bg-background px-4 py-10 transition-colors duration-300">
        <div className="flex flex-col items-start space-y-4 max-w-3xl mx-auto">
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
                <TableHead>Rol</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                    <TableCell>
                    <Avatar>
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>
                    <Button
                        onClick={() => setSelectedUser(user)}
                        className="rounded-xl bg-[#A0A0A0] w-32"
                    >
                        {user.role}
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

        {selectedUser && (
            <CambiarRolModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            />
        )}
        </div>
    );
}
