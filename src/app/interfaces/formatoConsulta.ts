export interface formatoConsulta {
    id?: number;
    id_consulta?: number;
    detalle: {
        enfermedad_actual: any;
        antecedentes: {
            hta: any;
            dm: any;
            alergias_medicamentos: any;
        };
        operaciones_anteriores: any;
        examen_fisico: any;
        diagnosticos: any;
        receta: any;
        examenes: any;
    };
}