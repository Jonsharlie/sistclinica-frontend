export interface ItemKardex {
    id_producto: number;
    id_area: number;
    id_tipomovimiento: number;
    codigo_producto?: string;
    nombre_producto: string;
    entrada: boolean;
    salida: boolean;
    cantidad: number;
    id_tipodocumento?: number;
    detalle_movimiento: string;
    numero_serie?: string;
    numero_correlativo?: string;
    id_puntoventa: number;
    id_almacen: number;
    ejercicio: number;
    periodo: number;
    codigo_ingreso?: string;
    estado: boolean
}