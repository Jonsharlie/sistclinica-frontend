import { Component, OnDestroy } from '@angular/core';
import { tipoDocumento } from '../../../interfaces/tipoDocumento';
import { TipoDocumentoService } from '../../../services/tipo-documento.service';
import { ProveedorService } from '../../../services/proveedor.service';
import { Proveedor } from '../../../interfaces/proveedor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscarProductoComponent } from '../../buscar-producto/buscar-producto.component';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ItemCompra } from '../../../interfaces/itemCompra';
import { Producto } from '../../../interfaces/producto';
import { CompraService } from '../../../services/compra.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { ItemKardex } from '../../../interfaces/itemKardex';
import { Precio } from '../../../interfaces/precio';
import { Unidad } from '../../../interfaces/unidad';
import { UnidadService } from '../../../services/unidad.service';
import { PrecioService } from '../../../services/precio.service';

@Component({
  selector: 'app-agregar-editar-compra',
  templateUrl: './agregar-editar-compra.component.html',
  styleUrl: './agregar-editar-compra.component.css'
})
export class AgregarEditarCompraComponent implements OnDestroy {
  form: FormGroup
  operacion: string = 'Agregar'
  minDate: Date
  tipodocs: tipoDocumento[] = []
  proveedores: Proveedor[] = []
  itemsCompra: ItemCompra[] = []
  itemsKardex: any[] = []
  itemsPrecios: Precio[] = []
  tipoDocumento: tipoDocumento | undefined
  subscription: Subscription | undefined
  producto: Producto | undefined
  unidades: Unidad[] = []
  precio: Precio | undefined
  tGravado: number | undefined = 0.00
  tIgv: number | undefined = 0.00
  tSubtotal: number | undefined = 0.00
  tTotal: number| undefined = 0.00
  nombre_unidad: string = ""
  displayedColumns: string[] = ['nombre_producto', 'unidad', 'precio_final', 'cantidad', 'total', 'acciones'];
  dataSource: MatTableDataSource<ItemCompra>
  isDisabled: boolean = false

  constructor(
    private _tipoDocumentoService: TipoDocumentoService,
    private _proveedorService: ProveedorService,
    private _compraService: CompraService,
    private _unidadService: UnidadService,
    private _precioService: PrecioService,
    private fb: FormBuilder,
    private dataService: DataService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource()
    this.form = this.fb.group({
      fecha_emision: [new Date(), Validators.required],
      id_tipo_documento: [7, Validators.required],
      id_proveedor: ['', Validators.required],
      serie: ['', Validators.required],
      correlativo: ['', Validators.required],
      producto: this.fb.group({
        nombre: ['', Validators.required],
        id_unidad: ['', Validators.required],
        stock: ['', Validators.required],
        precio_compra: ['', Validators.required],
        precio_venta: ['', Validators.required],
        cantidad: ['', Validators.required]
      })
    })

    this.minDate = new Date()

    this.subscription = this.dataService.data$.subscribe((data:any) => {
      this.producto = data
      let itemProducto =  {
        nombre: data.nombre,
        id_unidad: data.id_unidad,
        stock: data.stock,
        precio_compra: data.precio_compra,
        precio_venta: data.precio_venta,
        cantidad: 1
      }
      this.form.patchValue({
        producto: itemProducto
      })

      if (data.id_unidad == data.id_unidad_frac) {
        this._unidadService.getUnidad(data.id_unidad).subscribe((data:any) => {
          this.unidades.push(data)
        })
      } else {
        this._unidadService.getUnidad(data.id_unidad).subscribe((data:any) => {
          this.unidades.push(data)
        })
  
        this._unidadService.getUnidad(data.id_unidad_frac).subscribe((data:any) => {
          this.unidades.push(data)
        })
      }

      console.log('unidades', this.unidades)
    })
  }

  ngOnInit() {
    this.loadData()
    this.initValues()
    this.form.get('producto')?.get('nombre')?.disable()
    this.form.get('producto')?.get('stock')?.disable()
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  initValues() {
    this.tGravado = 0.00
    this.tIgv = 0.00
    this.tSubtotal = 0.00
    this.tTotal = 0.00
  }

  loadData() {
    this.getTipoDocs()
    this.getProveedores()
  }

  getTipoDocs() {
    this._tipoDocumentoService.getTipoDocumentosCompra().subscribe((data:any) => {
      console.log('data tipodocs', data)
      this.tipodocs = data
    })
  }

  getProveedores() {
    const isSistema = 1
    this._proveedorService.getProveedores(isSistema).subscribe((data:any) => {
      console.log('data proveedores', data)
      this.proveedores = data
    })
  }

  modalSearchProducto() {
    const dialogRef = this.dialog.open(BuscarProductoComponent, {
      width: '850px',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('result modalSearchProducto', result)
    })
  }

  addProduct() {
    const producto = this.form.get('producto')
    const descuento = 0.00
    const cantidad = producto?.get('cantidad')?.value
    const precio_compra = producto?.get('precio_compra')?.value
    const precio_venta = producto?.get('precio_venta')?.value
    const subtotal = (precio_compra * cantidad)
    const igv = (subtotal * 0.18)
    const total = subtotal + igv
    const gravado = 0
    const nombre_producto = producto?.get('nombre')?.value

    const currentDate = new Date();

    const itemKardex: ItemKardex = {
      id_producto: Number(this.producto!.id),
      id_area: 2,
      id_tipomovimiento: 2,
      nombre_producto,
      entrada: true,
      salida: false,
      cantidad: producto?.get('cantidad')?.value,
      id_tipodocumento: this.form.value.id_tipo_documento,
      detalle_movimiento: 'INGRESO DE MERCADERÍA PROD: '+nombre_producto,
      numero_serie: this.form.value.serie,
      numero_correlativo: this.form.value.correlativo,
      id_puntoventa: 1,
      id_almacen: 1,
      ejercicio: currentDate.getFullYear(),
      periodo: currentDate.getMonth() + 1,
      estado: true
    }

    this._unidadService.getUnidad(this.producto?.id_unidad!).subscribe((data:any) => {
      this.nombre_unidad = data.nombre
      console.log('unidad selected', this.nombre_unidad)
    })

    const itemCompra:ItemCompra = {
      id_producto: this.producto!.id,
      nombre_producto: this.producto!.nombre,
      id_unidad: this.producto?.id_unidad,
      nombre_unidad: this.nombre_unidad,
      cantidad,
      precio_unitario: precio_compra,
      descuento,
      precio_final: (precio_compra - descuento),
      gravado,
      igv,
      subtotal,
      total,
      incluyeigv: false,
      estado: true
    }

    const itemPrecio:Precio = {
      id_producto: this.producto?.id,
      id_unidad: this.producto?.id_unidad,
      id_unidad_frac: this.producto?.id_unidad_frac,
      precio_costo_entero: precio_compra,
      precio_venta_entero: precio_venta,
      precio_costo_fraccion: (precio_compra / this.producto!.capacidad),
      precio_venta_fraccion: (precio_venta / this.producto!.capacidad),
      estado: true
    }

    this.itemsCompra.push(itemCompra)

    this.itemsKardex.push(itemKardex)

    this.itemsPrecios.push(itemPrecio)

    console.log('this.itemsCompra desde componente', this.itemsCompra)

    console.log('this.itemsKardex desde componente', this.itemsKardex)

    console.log('this.itemPrecios desde componente', this.itemsPrecios)

    this.dataSource.data = this.itemsCompra

    let itemProducto =  {
      nombre: '',
      stock: '',
      precio_compra: '',
      precio_venta: '',
      cantidad: ''
    }

    this.form.patchValue({producto: itemProducto})

    this.tGravado = this.itemsCompra.map(item => item.gravado).reduce((prev, next) => prev + next)
    
    this.tIgv = this.itemsCompra.map(item => item.igv).reduce((prev, next) => prev + next)

    this.tTotal = this.itemsCompra.map(item => item.total).reduce((prev, next) => prev + next)

    this.tSubtotal = this.itemsCompra.map(item => item.subtotal).reduce((prev, next) => prev + next)
  
    this.unidades = []
  }

  removeProduct() {
    /*
    let itemProducto =  {
      nombre: '',
      stock: '',
      precio: '',
      cantidad: ''
    }
    */
    this.form.patchValue({producto: null})
  }

  limpiar() {
    // this.form.patchValue({id_tipo_documento: 7})
    // this.form.patchValue({id_proveedor: ''})
    // this.form.patchValue({serie: ''})
    // this.form.patchValue({correlativo: ''})
    // this.form.patchValue({producto: null})
    this.form.reset()
    this.initValues()
  }

  cancel() {
    this.limpiar()
  }

  save() {
    let compra = {
      serie: this.form.value.serie,
      correlativo: this.form.value.correlativo,
      id_proveedor: this.form.value.id_proveedor,
      tipo_pago: 'CONTADO',
      id_puntoventa: 1,
      id_tipo_documento: this.form.value.id_tipo_documento,
      fecha_emision: this.form.value.fecha_emision.toISOString().slice(0, 10),
      fecha_pago: this.form.value.fecha_emision.toISOString().slice(0, 10),
      gravado: 0,
      igv: this.tIgv!,
      subtotal: this.tSubtotal!,
      total: this.tTotal!,
      descuento: 0,
      incluyeigv: false,
      estado: true,
      items: this.itemsCompra,
      itemsKardex: this.itemsKardex,
      precios: this.itemsPrecios
    }

    this._compraService.addCompra(compra).subscribe(() => {
      this.mensajeExito("registrada")
      // this.limpiar()
      this.isDisabled = true
      console.log('isDisabled', this.isDisabled)
    })
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`La compra fue ${operacion} con éxito`, '', {
      duration: 2000
    });
  }

  confirmDialog() {
    const message = '¿Seguro que quieres realizar esta acción?'
    const dialogData = new ConfirmDialogModel("Confirmar acción", message)
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      disableClose: true,
      data: dialogData
    })
    dialogRef.afterClosed().subscribe((dialogResult:any) => {
      if (dialogResult) {
        this.save()
      }
    })
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`])
  }

  onUnidadSelected(id_unidad: number) {
    console.log(this.form.value.id_unidad)
    console.log('event unidad selected', id_unidad)
    this._precioService.getUltimoPrecio(this.producto?.id!).subscribe((data:any) => {
      let precio_compra = 0
      let precio_venta = 0
      if (this.producto?.id_unidad == id_unidad) {
        precio_compra = data.precio_costo_entero
        precio_venta = data.precio_venta_entero
      } else {
        precio_compra = data.precio_costo_fraccion
        precio_venta = data.precio_venta_fraccion
      }
      console.log('data precio selected', data)
      console.log('precio_compra', precio_compra)
      console.log('precio_venta', precio_venta)

      let itemProducto =  {
        precio_compra,
        precio_venta
      }

      this.form.patchValue({
        producto: itemProducto
      })
    })
  }

  removeItemCompra(id_producto: number) {
    const newItemsCompra:ItemCompra[] = this.itemsCompra.filter((element) => {
      return element.id_producto !== id_producto
    })
    console.log('newItemsCompra', newItemsCompra)
    this.itemsCompra = newItemsCompra
  }
}
