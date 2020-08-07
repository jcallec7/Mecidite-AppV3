import { Consulta } from './Consulta';

export class Factura {
    uid: string;
    nombre: string;
    cedula_ruc: string;
    telefono: string
    fecha: string;
    direccion: string;
    consultaUID: string;
    subtotal: number;
    total: number;
}