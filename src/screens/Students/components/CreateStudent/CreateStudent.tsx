"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "react-query";
import { useCreateStudents } from "../../hooks/useCreateStudents";
import { toast } from "sonner";

interface CreateStudentDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StudentFormData {
  nombre: string;
  apellido: string;
}

export default function CreateStudentDialog({
  isOpen,
  onClose,
}: CreateStudentDialogProps) {
  const [formData, setFormData] = useState<StudentFormData>({
    nombre: "",
    apellido: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const queryClient = useQueryClient();

  const {
    mutate: createBook,
    isIdle,
    reset,
  } = useCreateStudents({
    onSuccess: () => {
      onOpen();
      reset();
      toast.success("Estudiante creado con éxito", { duration: 3000 });
      queryClient.invalidateQueries(["students"]);
    },
    onError: () => {
      toast.error("Ocurrio un error", { duration: 3000 });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      createBook(formData);
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  const onOpen = () => {
    reset();
    onClose();
    setFormData({
      nombre: "",
      apellido: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Estudiante</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre" className="text-right">
                Nombre
              </Label>
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apellido" className="text-right">
                Apellido
              </Label>
              <Input
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button disabled={!isIdle} type="submit">
              Crear Estudiante
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
