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
import { useCreateBooks } from "../../hooks/useCreateBooks";
import { toast } from "sonner";

interface CreateBookDialogProps {
  isOpen: boolean;
  onClose: () => void;
  queryValue: string;
}

interface BookFormData {
  titulo: string;
  autor: string;
  genero: string;
  anioPublicacion: number;
}

export default function CreateBookDialog({
  isOpen,
  onClose,
  queryValue,
}: CreateBookDialogProps) {
  const [formData, setFormData] = useState<BookFormData>({
    titulo: "",
    autor: "",
    genero: "",
    anioPublicacion: new Date().getFullYear(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "anioPublicacion" ? parseInt(value, 10) : value,
    }));
  };

  const queryClient = useQueryClient();

  const {
    mutate: createBook,
    isIdle,
    reset,
  } = useCreateBooks({
    onSuccess: () => {
      onOpen();
      toast.success("Libro creado con éxito", { duration: 3000 });
      queryClient.invalidateQueries(["books"]);
      queryClient.invalidateQueries(["available"]);
      if (queryValue) {
        queryClient.invalidateQueries(["books-by", queryValue]);
      }
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
      titulo: "",
      autor: "",
      genero: "",
      anioPublicacion: new Date().getFullYear(),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nuevo Libro</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="titulo" className="text-right">
                Título
              </Label>
              <Input
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="autor" className="text-right">
                Autor
              </Label>
              <Input
                id="autor"
                name="autor"
                value={formData.autor}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="genero" className="text-right">
                Género
              </Label>
              <Input
                id="genero"
                name="genero"
                value={formData.genero}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="anioPublicacion" className="text-right">
                Año de Publicación
              </Label>
              <Input
                id="anioPublicacion"
                name="anioPublicacion"
                type="number"
                value={formData.anioPublicacion}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button disabled={!isIdle} type="submit">
              Crear Libro
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
