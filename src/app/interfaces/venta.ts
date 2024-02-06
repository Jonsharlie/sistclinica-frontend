import { ItemKardex } from "./itemKardex";
import { ItemVenta } from "./itemVenta";

export interface Venta {
    id?: number;
    id_tipo_documento: number;
    id_tipo_pago?: number;
    id_forma_pago?: number;
    id_puntoventa: number;
    serie: string;
    correlativo: string;
    nombre_cliente: string;
    forma_pago: string;
    tipo_pago: string;
    fecha_registro: Date;
    gravado: number;
    igv: number;
    subtotal: number;
    total: number;
    descuento: number;
    incluyeigv: boolean;
    estado: boolean;
    items: ItemVenta[],
    itemsKardex?: ItemKardex[]
}