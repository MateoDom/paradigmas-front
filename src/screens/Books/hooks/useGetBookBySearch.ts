import api from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { IBook } from "../models/bookModel";

const fetchBooks = async (value: string): Promise<IBook[]> => {
  const { data } = await api.get<IBook[]>(
    `/libros/buscar?criterio=titulo&valor=${value}`
  );
  return data;
};

export const useGetBooksBySearch = (
  value: string,
  options?: UseQueryOptions<IBook[], Error>
) => {
  return useQuery<IBook[], Error>(
    ["books-by", value],
    () => fetchBooks(value),
    options
  );
};
