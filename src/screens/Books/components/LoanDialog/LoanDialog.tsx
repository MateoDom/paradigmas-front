import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetStudents } from "@/screens/Students/hooks/useGetStudents";
import { LoadingSpinner } from "@/components/ui/spinner";
import { IStudent } from "@/screens/Students/models/studentModel";
import { useRegisterLoan } from "@/screens/Loans/hooks/useRegisterLoan";
import { IBook } from "../../models/bookModel";
import { useQueryClient } from "react-query";

interface LoanDialogProps {
  book: IBook;
}

const LoanDialog: React.FC<LoanDialogProps> = ({ book }) => {
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [loanDuration, setLoanDuration] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: students, isLoading } = useGetStudents();
  const queryClient = useQueryClient();

  const {
    mutate: registerLoan,
    isIdle,
    reset,
  } = useRegisterLoan({
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries(["books"]);
    },
  });

  const handleRegister = () => {
    registerLoan({
      bookId: book.idLibro,
      duration: loanDuration,
      studentId: selectedStudent,
    });
  };

  const onOpen = (open: boolean) => {
    setIsOpen(open);
    setSelectedStudent("");
    setLoanDuration("");
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogTrigger asChild>
        <Button disabled={!isIdle} size="sm" variant="outline">
          Registrar Préstamo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Préstamo</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner className=" animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="book" className="text-right">
                  Libro
                </Label>
                <Input
                  id="book"
                  value={book.titulo}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="student" className="text-right">
                  Estudiante
                </Label>
                <Select
                  value={selectedStudent}
                  onValueChange={setSelectedStudent}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar estudiante" />
                  </SelectTrigger>
                  <SelectContent>
                    {students?.map((student: IStudent) => (
                      <SelectItem
                        key={student.idEstudiante}
                        value={student.idEstudiante.toString()}
                      >
                        {student.nombre} {student.apellido}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duración (días)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  value={loanDuration}
                  onChange={(e) => setLoanDuration(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleRegister}>Registrar Préstamo</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoanDialog;
