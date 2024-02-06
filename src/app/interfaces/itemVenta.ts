export interface ItemVenta {
    id_producto?: number;
    nombre_producto?: string;
    id_unidad?: number;
    cantidad: number;
    precio_unitario: number;
    descuento?: number;
    precio_final: number;
    gravado: number;
    igv: number;
    subtotal: number;
    total: number;
    incluyeigv: boolean;
    estado: boolean
}