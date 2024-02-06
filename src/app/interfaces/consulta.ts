export interface Consulta {
    id?: number;
    id_tipo_paciente: number;
    id_medico_consulta: number;
    id_medico_atencion?: number;
    nro_historia: string;
    nombre_paciente: string;
    fecha_registro: Date;
    fecha_atencion?: Date;
    fecha_reprograma?: Date;
    estado_consulta: string;
    tipo_atencion: string,
    estado: boolean;
    id_especialidad: number;
    nombre_servicio: string;
    nombre_tipopaciente: string;
    doctor_consulta: string;
    doctor_atencion?: string;
    nombre_tiposervicio:string;
    fecha_nacimiento: Date;
    valor: number;
    id_consultaformato?: number;
    detalle_consultaformato?: string
}