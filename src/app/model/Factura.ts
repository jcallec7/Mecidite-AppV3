import { Consulta } from './Consulta';

export class Factura {
    uid: string;
    nombre: string;
    cedula_ruc: string;
    fecha: Date;
    direccion: string;
    consulta: Consulta;
    subtotal: number;
    total: number;
}