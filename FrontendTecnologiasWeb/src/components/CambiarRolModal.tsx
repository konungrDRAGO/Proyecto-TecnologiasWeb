import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type Usuario = {
  id_usuario: number;
  nombre_completo: string;
  rol: string;
};

interface CambiarRolModalProps {
  user: Usuario;
  onClose: () => void;
  onSave?: (id: number, newRole: string) => void;
}

export function CambiarRolModal({
  user,
  onClose,
  onSave,
}: CambiarRolModalProps) {
  const [selectedRole, setSelectedRole] = useState(user.rol);

  const handleSave = () => {
    if (onSave) {
      onSave(user.id_usuario, selectedRole);
    }
    onClose();
  };

  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cambiar rol de {user.nombre_completo}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <Label htmlFor="role">Nuevo rol</Label>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger id="role">
              <SelectValue placeholder="Seleccionar rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMINISTRADOR">Administrador</SelectItem>
              <SelectItem value="MODERADOR">Moderador</SelectItem>
              <SelectItem value="USUARIO">Usuario</SelectItem>
              <SelectItem value="LECTURA">Solo lectura</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
