import api from "api"; // Usamos el absolute import que configuramos

const BookServices = {
  getAllBooks: async () => {
    return await api.get("/system/api/v1/libros");
  },
};

export default BookServices;