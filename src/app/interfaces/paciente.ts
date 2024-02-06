export interface Paciente {
    nro_historia?: string;
    nro_historia_fisica?: string;
    id_tipo_documento: number;
    id_tipo_paciente: number;
    apellido_paterno: string;
    apellido_materno: string;
    nombres: string;
    fecha_nacimiento: Date;
    numero_telefono?: string;
    direccion?: string;
    sexo: string;
    estado: boolean;
    updated_at?: Date;
}