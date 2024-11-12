import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetStudents } from "./hooks/useGetStudents";
import { IStudent } from "./models/studentModel";
import CreateStudentDialog from "./components/CreateStudent/CreateStudent";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Students = () => {
  const { data: students, isLoading } = useGetStudents();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  return (
    <div className="container  py-8">
      <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Estudiantes</CardTitle>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Crear Estudiante
          </Button>
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
                    <TableHead>Estudiante</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students &&
                    students?.map((student: IStudent) => (
                      <TableRow key={student.idEstudiante}>
                        <TableCell className="font-medium">
                          {student.nombre} {student.apellido}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
      <CreateStudentDialog
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default Students;
