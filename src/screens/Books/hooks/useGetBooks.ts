import api from "api";
import { useQuery } from "react-query";
import { IBook } from "../models/bookModel";

const QUERY_KEY = ["books"];

const fetchBooks = async (): Promise<IBook[]> => {
  const { data } = await api.get<IBook[]>(`/libros`);
  return data;
};

export const useGetBooks = () => {
  return useQuery<IBook[], Error>(QUERY_KEY, () => fetchBooks());
};
