export interface ItemCompra {
    id_producto?: number;
    nombre_producto?: string;
    id_unidad?: number;
    nombre_unidad?: string;
    cantidad: number;
    precio_unitario: number;
    descuento?: number;
    precio_final: number;
    gravado: number;
    igv: number;
    subtotal: number;
    total: number;
    nro_lote?: string;
    vencimiento_lote?: Date;
    incluyeigv: boolean;
    estado: boolean
}