import { ItemCompra } from "./itemCompra";
import { ItemKardex } from "./itemKardex"

export interface Compra {
    id?: number;
    serie: string;
    correlativo: string;
    tipo_pago: string;
    id_puntoventa: number;
    id_tipo_documento: number;
    fecha_emision: Date;
    fecha_pago?: Date;
    gravado: number;
    igv: number;
    subtotal: number;
    total: number;
    descuento: number;
    incluyeigv: boolean;
    estado: boolean,
    items: ItemCompra[],
    itemsKardex?: ItemKardex[]
}