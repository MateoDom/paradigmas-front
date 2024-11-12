import api from "api";
import { useMutation, UseMutationOptions } from "react-query";

interface RegisterLoanVariables {
  loanId: number;
}

export const useReturnLoan = (
  options?: UseMutationOptions<void, Error, RegisterLoanVariables>
) => {
  return useMutation(async ({ loanId }: RegisterLoanVariables) => {
    await api.put(`/prestamos/${loanId}`, null);
  }, options);
};
