import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useQueryClient } from "react-query";
import { ILoan } from "../../models/loanModel";
import { useReturnLoan } from "../../hooks/useReturnLoan";

interface LoanDialogProps {
  loan: ILoan;
}

const ReturnLoanDialog: React.FC<LoanDialogProps> = ({ loan }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const {
    mutate: returnLoan,
    isIdle,
    reset,
  } = useReturnLoan({
    onSuccess: () => {
      reset();
      setIsOpen(false);
      queryClient.invalidateQueries(["loans"]);
    },
  });

  const handleReturn = () => {
    returnLoan({
      loanId: loan.idPrestamo,
    });
  };

  const onOpen = (open: boolean) => {
    setIsOpen(open);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogTrigger asChild>
        <Button disabled={!isIdle} size="sm" variant="outline">
          Marcar como devuelto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Devolución</DialogTitle>
        </DialogHeader>
        <>
          <p className="mb-4">
            ¿Estás seguro de que deseas marcar el libro{" "}
            <strong>{loan.ejemplar.libro.titulo}</strong> como devuelto por el
            estudiante{" "}
            <strong>
              {loan.estudiante.nombre} {loan.estudiante.apellido}
            </strong>
            ?
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleReturn}>
              Sí, devolver
            </Button>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnLoanDialog;
