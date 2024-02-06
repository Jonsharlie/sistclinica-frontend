export interface Producto {
    id?: number;
    nombre: string;
    id_area: number;
    id_unidad: number;
    id_unidad_frac: number;
    nombre_unidadentero?: string,
    nombre_unidadfraccion?: string,
    capacidad: number;
    igv: boolean;
    utilidad?: number;
    codigo_gtin?: string;
    precio_costo?: number;
    precio_venta?: number;
    stock: number;
    venta: boolean;
    insumo: boolean;
    maneja_lote: boolean;
    estado: boolean;
}