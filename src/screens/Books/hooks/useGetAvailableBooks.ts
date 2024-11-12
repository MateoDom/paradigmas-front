import api from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { IBook } from "../models/bookModel";

const QUERY_KEY = ["available"];

const fetchBooks = async (): Promise<IBook[]> => {
  const { data } = await api.get<IBook[]>(`/ejemplares/disponibles`);
  return data;
};

export const useGetAvailableBooks = (
  options?: UseQueryOptions<IBook[], Error>
) => {
  return useQuery<IBook[], Error>(QUERY_KEY, () => fetchBooks(), options);
};
