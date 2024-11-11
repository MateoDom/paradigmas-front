import api from "api";
import { useMutation, UseMutationOptions } from "react-query";

interface RegisterLoanVariables {
  bookId: number;
  studentId: string;
  duration: string;
}

export const useRegisterLoan = (
  options?: UseMutationOptions<void, Error, RegisterLoanVariables>
) => {
  return useMutation(
    async ({
      bookId,
      studentId,
      duration,
    }: {
      bookId: number;
      studentId: string;
      duration: string;
    }) => {
      await api.post(
        `/prestamos?idEstudiante=${studentId}&idLibro=${bookId}&diasDuracion=${duration}`, null
      );
    },
    options
  );
};
