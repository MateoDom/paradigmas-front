import api from "api";
import { useMutation, UseMutationOptions } from "react-query";

interface ICreateStudent {
  nombre: string;
  apellido: string;
}

export const useCreateStudents = (
  options?: UseMutationOptions<void, Error, ICreateStudent>
) => {
  return useMutation(async ({ nombre, apellido }: ICreateStudent) => {
    await api.post(`/estudiantes`, {
      nombre,
      apellido,
    });
  }, options);
};
