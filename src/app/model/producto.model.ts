export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    disponibilidad: boolean;
    cantidad?: number;
    
}

//Una interfaz es un molde o contrato que describe cómo debe ser un objeto.