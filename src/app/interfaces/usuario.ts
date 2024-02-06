export interface Usuario {
    id?: number;
    id_trabajador: number;
    id_cargo: number;
    nombres: string;
    apellidos: string;
    email?: string;
    sistema:boolean;
    login: string;
    password: string;
    estado: boolean;
}