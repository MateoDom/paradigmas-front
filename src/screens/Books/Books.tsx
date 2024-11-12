import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IBook } from "./models/bookModel";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import LoanDialog from "./components/LoanDialog/LoanDialog";
import { useGetAvailableBooks, useGetBooks } from "./hooks";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useDebounce from "@/hooks/useDebounce";
import { useGetBooksBySearch } from "./hooks/useGetBookBySearch";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateBookDialog from "./components/CreateBook/CreateBook";

const Books = () => {
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const isAvailable = (availables: number) => {
    return availables > 0;
  };

  const debouncedSearch = useDebounce(searchQuery, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isFiltering) {
      setIsFiltering(false);
    }
    setSearchQuery(event.target.value);
  };

  const { data: books, isLoading } = useGetBooks();
  const { data: availableBooks, isLoading: isLoadingAvailable } =
    useGetAvailableBooks({ enabled: isFiltering });
  const { data: searchBooks, isLoading: isLoadingSearch } = useGetBooksBySearch(
    debouncedSearch,
    { enabled: !!debouncedSearch }
  );

  const tableDate = debouncedSearch
    ? searchBooks
    : isFiltering
    ? availableBooks
    : books;

  return (
    <div className="container  py-8">
      <Card>
        <CardHeader>
          <CardTitle>Libros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-72">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por título"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-8"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="available-filter"
                    checked={isFiltering}
                    onCheckedChange={setIsFiltering}
                  />
                  <Label htmlFor="available-filter">
                    Mostrar solo disponibles
                  </Label>
                </div>
              </div>
              <div className="ml-auto">
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Crear Libro
                </Button>
              </div>
            </div>
          </div>
          <div className="relative overflow-x-auto">
            {isLoading || isLoadingAvailable || isLoadingSearch ? (
              <div className="flex justify-center items-center h-screen">
                <LoadingSpinner className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Año</TableHead>
                    <TableHead className="text-center">
                      Total Ejemplares
                    </TableHead>
                    <TableHead className="text-center">Disponibles</TableHead>
                    <TableHead className="text-center">Estado</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableDate && tableDate?.map((libro: IBook) => (
                    <TableRow key={libro.idLibro}>
                      <TableCell className="font-medium">
                        {libro.titulo}
                      </TableCell>
                      <TableCell>{libro.autor}</TableCell>
                      <TableCell>{libro.anioPublicacion}</TableCell>
                      <TableCell className="text-center">
                        {libro.cantidadDeEjemplares}
                      </TableCell>
                      <TableCell className="text-center">
                        {libro.cantidadDeEjemplaresDisponibles}
                      </TableCell>
                      <TableCell className="text-center">
                        {isAvailable(libro.cantidadDeEjemplaresDisponibles) ? (
                          <Badge className="bg-green-500 hover:bg-green-600">
                            Disponible
                          </Badge>
                        ) : libro.cantidadDeEjemplaresDisponibles === 0 ? (
                          "-"
                        ) : (
                          <Badge variant="destructive">Prestado</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {isAvailable(libro.cantidadDeEjemplaresDisponibles) ? (
                          <LoanDialog
                            book={libro}
                            queryValue={debouncedSearch}
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
      <CreateBookDialog
        isOpen={isCreateModalOpen}
        queryValue={debouncedSearch}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default Books;
