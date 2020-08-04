import { Usuario } from './Usuario';
import { Diagnostico } from './Diagnostico';

export class Consulta {

    uid: string;
    paciente: Usuario;
    medico: Usuario;
    estado: string;
    fecha: string;
    diagnostico: Diagnostico;

}