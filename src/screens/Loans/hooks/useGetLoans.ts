import api from "api";
import { useQuery } from "react-query";
import { ILoan } from "../models/loanModel";

const QUERY_KEY = ["loans"];

const fetchLoans = async (): Promise<ILoan[]> => {
  const { data } = await api.get<ILoan[]>(`/prestamos`);
  return data;
};

export const useGetLoans = () => {
  return useQuery<ILoan[], Error>(QUERY_KEY, () => fetchLoans());
};
