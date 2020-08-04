import { Factura } from './Factura';

export class Caja {
    uid: string;
    fecha: Date;
    facturas: Factura[];
    subtotal: number;
    total: number;
}