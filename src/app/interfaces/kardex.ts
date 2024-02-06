export interface Kardex {
    id: number;
    id_producto: number;
    id_area: number;
    id_tipomovimiento: number;
    id_operacion: number;
    id_tipodocumento: number;
    id_puntoventa: number;
    id_almacen: number;
    nombre_producto: string;
    entrada: boolean;
    salida: boolean;
    cantidad: number;
    detalle_movimiento: string;
    numero_serie: string;
    numero_correlativo: string;
    nombre_area: string;
    nombre_tipomovimiento: string;
    nombre_tipodocumento: string;
    abrev_tipodocumento: string
}