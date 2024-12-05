export interface Event {
    nombre: string;
    descripcion: string;
    imagen: string;
    ubicacion: string;
    coordenadas: {
      lat: number;
      lng: number;
    };
    fecha: Date;
    userId: string;
    createdAt: Date;
  }