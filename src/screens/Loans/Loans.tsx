import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetLoans } from "./hooks/useGetLoans";
import { LoadingSpinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ILoan } from "./models/loanModel";
import ReturnLoanDialog from "./components/ReturnLoan/ReturnLoan";

const Loans = () => {
  const { data: loans, isLoading } = useGetLoans();

  return (
    <div className="container  py-8">
      <Card>
        <CardHeader>
          <CardTitle>Préstamos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-screen">
                <LoadingSpinner className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título del Libro</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Año</TableHead>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Fecha de Préstamo</TableHead>
                    <TableHead>Fecha de Devolución</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loans && loans?.map((prestamo: ILoan) => (
                    <TableRow key={prestamo.idPrestamo}>
                      <TableCell className="font-medium">
                        {prestamo.ejemplar.libro.titulo}
                      </TableCell>
                      <TableCell>{prestamo.ejemplar.libro.autor}</TableCell>
                      <TableCell>
                        {prestamo.ejemplar.libro.anioPublicacion}
                      </TableCell>
                      <TableCell>
                        {prestamo.estudiante.nombre}{" "}
                        {prestamo.estudiante.apellido}
                      </TableCell>
                      <TableCell>
                        {new Date(prestamo.fechaPrestamo).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(
                          prestamo.fechaDevolucion
                        ).toLocaleDateString()}
                      </TableCell>

                      <TableCell className="text-right">
                        <ReturnLoanDialog loan={prestamo} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Loans;
