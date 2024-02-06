export interface Precio {
    id_producto?: number;
    id_unidad?: number;
    id_unidad_frac?: number;
    precio_costo_entero?: number;
    precio_costo_fraccion?: number;
    precio_venta_entero?: number;
    precio_venta_fraccion?: number;
    estado: boolean;
}