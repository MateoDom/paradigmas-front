import api from "api";
import { useMutation, UseMutationOptions } from "react-query";

interface IAddBook {
  id: number;
}

export const useAddEjemplar = (
  options?: UseMutationOptions<void, Error, IAddBook>
) => {
  return useMutation(async ({ id }: IAddBook) => {
    await api.post(`/libros/${id}/ejemplar`, null);
  }, options);
};
