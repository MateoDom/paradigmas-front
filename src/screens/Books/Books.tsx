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

import { useGetBooks } from "./hooks/useGetBooks";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import LoanDialog from "./components/LoanDialog/LoanDialog";

const Books = () => {
  const isAvailable = (availables: number) => {
    return availables > 0;
  };

  const { data: books, isLoading } = useGetBooks();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner className="h-8 w-8 animate-spin" />
      </div>
    );

  return (
    <div className="container  py-8">
      <Card>
        <CardHeader>
          <CardTitle>Consulta de Libros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
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
                {books?.map((libro: IBook) => (
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
                        <LoanDialog book={libro} />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Books;
