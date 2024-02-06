export interface Trabajador {
    id?: number;
    id_tipo_documento: number;
    id_cargo: number;
    apellido_paterno: string;
    apellido_materno: string;
    nombres: string;
    fecha_nacimiento: Date;
    nro_documento: string;
    numero_colegiatura?: string;
    numero_telefono?: string;
    direccion?: string;
    email?: string;
    sexo: string;
    estado: boolean;
}