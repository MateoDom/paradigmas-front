export interface ILoan {
  idPrestamo: number;
  estudiante: {
    idEstudiante: number;
    nombre: string;
    apellido: string;
  };
  ejemplar: {
    idEjemplar: number;
    libro: {
      idLibro: number;
      titulo: string;
      autor: string;
      genero: string;
      anioPublicacion: number;
    };
    esPrestado: boolean;
  };
  fechaPrestamo: string;
  fechaDevolucion: string;
}
