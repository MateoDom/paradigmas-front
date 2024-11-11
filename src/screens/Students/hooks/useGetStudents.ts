import api from "api";
import { useQuery } from "react-query";
import { IStudent } from "../models/studentModel";

const QUERY_KEY = ["students"];

const fetchStudents = async (): Promise<IStudent[]> => {
  const { data } = await api.get<IStudent[]>(`/estudiantes`);
  return data;
};

export const useGetStudents = () => {
  return useQuery<IStudent[], Error>(QUERY_KEY, () => fetchStudents());
};
