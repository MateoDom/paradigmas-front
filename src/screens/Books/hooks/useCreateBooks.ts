import api from "api";
import { useMutation, UseMutationOptions } from "react-query";

interface ICreateBook {
  titulo: string;
  autor: string;
  genero: string;
  anioPublicacion: number;
}

export const useCreateBooks = (
  options?: UseMutationOptions<void, Error, ICreateBook>
) => {
  return useMutation(
    async ({ titulo, autor, genero, anioPublicacion }: ICreateBook) => {
      await api.post(`/libros`, {
        titulo,
        autor,
        genero,
        anioPublicacion,
      });
    },
    options
  );
};
