import { Component, OnDestroy } from '@angular/core';
import { tipoDocumento } from '../../../interfaces/tipoDocumento';
import { Producto } from '../../../interfaces/producto';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemVenta } from '../../../interfaces/itemVenta';
import { MatTableDataSource } from '@angular/material/table';
import { VentaService } from '../../../services/venta.service';
import { TipoDocumentoService } from '../../../services/tipo-documento.service';
import { DataService } from '../../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BuscarProductoComponent } from '../../buscar-producto/buscar-producto.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { DocumentoNumeracionService } from '../../../services/documento-numeracion.service';
import { ItemKardex } from '../../../interfaces/itemKardex';
import { Unidad } from '../../../interfaces/unidad';
import { UnidadService } from '../../../services/unidad.service';
import { PrecioService } from '../../../services/precio.service';
import { Precio } from '../../../interfaces/precio';

@Component({
  selector: 'app-agregar-editar-venta',
  templateUrl: './agregar-editar-venta.component.html',
  styleUrl: './agregar-editar-venta.component.css'
})
export class AgregarEditarVentaComponent implements OnDestroy {
  form: FormGroup
  operacion: string = 'Agregar'
  minDate: Date
  tipodocs: tipoDocumento[] = []
  itemsVenta: ItemVenta[] = []
  tipoDocumento: tipoDocumento | undefined
  subscription: Subscription | undefined
  producto: Producto | undefined
  unidades: Unidad[] = []
  precio: Precio | undefined
  tGravado: number | undefined = 0.00
  tIgv: number | undefined = 0.00
  tSubtotal: number | undefined = 0.00
  tTotal: number| undefined = 0.00
  itemsKardex: any[] = []
  displayedColumns: string[] = ['nombre_producto', 'precio_final', 'cantidad', 'total'];
  dataSource: MatTableDataSource<ItemVenta>
  formasPago = [
    {value: "EFECTIVO"},
    {value: "TARJETA"}
  ]
  tiposPago = [
    {value: "CONTADO"},
    {value: "CRÉDITO"}
  ]
  isDisabled: boolean = false

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _tipoDocumentoService: TipoDocumentoService,
    private _ventaService: VentaService,
    private _documentoNumeracionService: DocumentoNumeracionService,
    private _unidadService: UnidadService,
    private _precioService: PrecioService
  ) {
    this.dataSource = new MatTableDataSource()
    this.form = this.fb.group({
      fecha_registro: [new Date(), Validators.required],
      id_tipo_documento: [9, Validators.required],
      serie: ['', Validators.required],
      correlativo: ['', Validators.required],
      nombre_cliente: ['', Validators.required],
      forma_pago: ['EFECTIVO', Validators.required],
      tipo_pago: ['CONTADO', Validators.required],
      producto: this.fb.group({
        nombre: ['', Validators.required],
        id_unidad: ['', Validators.required],
        stock: ['', Validators.required],
        precio_unitario: ['', Validators.required],
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
        precio_unitario: data.precio_venta,
        cantidad: 1
      }
      this.form.patchValue({
        producto: itemProducto
      })

      this._unidadService.getUnidad(data.id_unidad).subscribe((data:any) => {
        this.unidades.push(data)
      })

      this._unidadService.getUnidad(data.id_unidad_frac).subscribe((data:any) => {
        this.unidades.push(data)
      })

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
    this.form.patchValue({nombre_cliente: 'VARIOS'})
    this.getTipoDocs()

    const id_tipo_documento = 9
    this._documentoNumeracionService.getNumeracion(id_tipo_documento).subscribe((data:any) => {
      console.log('documentoNumeracion', data)
      this.form.patchValue({ serie: data.serie})
      this.form.patchValue({ correlativo: data.correlativo})
    })
  }

  getTipoDocs() {
    this._tipoDocumentoService.getTipoDocumentosEmpresa().subscribe((data:any) => {
      console.log('data tipodocs', data)
      this.tipodocs = data
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
    const precio_costo = producto?.get('precio_unitario')?.value
    const subtotal = (precio_costo * cantidad)
    const igv = (subtotal * 0.18)
    const total = subtotal + igv
    const gravado = 0
    const nombre_producto = producto?.get('nombre')?.value

    const currentDate = new Date();

    const itemKardex: ItemKardex = {
      id_producto: Number(this.producto!.id),
      id_area: 2,
      id_tipomovimiento: 5,
      nombre_producto,
      entrada: false,
      salida: true,
      cantidad: producto?.get('cantidad')?.value,
      id_tipodocumento: this.form.value.id_tipo_documento,
      detalle_movimiento: 'SALIDA DE MERCADERÍA PROD: '+nombre_producto,
      numero_serie: this.form.value.serie,
      numero_correlativo: this.form.value.correlativo,
      id_puntoventa: 1,
      id_almacen: 1,
      ejercicio: currentDate.getFullYear(),
      periodo: currentDate.getMonth() + 1,
      estado: true
    }

    const itemVenta:ItemVenta = {
      id_producto: this.producto!.id,
      nombre_producto: this.producto!.nombre,
      id_unidad: this.producto?.id_unidad,
      cantidad,
      precio_unitario: precio_costo,
      descuento,
      precio_final: (precio_costo - descuento),
      gravado,
      igv,
      subtotal,
      total,
      incluyeigv: false,
      estado: true
    }

    this.itemsVenta.push(itemVenta)

    this.itemsKardex.push(itemKardex)

    console.log('this.itemsVenta desde componente', this.itemsVenta)

    console.log('this.itemsKardex desde componente', this.itemsKardex)

    this.dataSource.data = this.itemsVenta

    let itemProducto =  {
      nombre: '',
      stock: '',
      precio: '',
      cantidad: ''
    }

    this.form.patchValue({producto: itemProducto})

    this.tGravado = this.itemsVenta.map(item => item.gravado).reduce((prev, next) => prev + next)
    
    this.tIgv = this.itemsVenta.map(item => item.igv).reduce((prev, next) => prev + next)

    this.tTotal = this.itemsVenta.map(item => item.total).reduce((prev, next) => prev + next)

    this.tSubtotal = this.itemsVenta.map(item => item.subtotal).reduce((prev, next) => prev + next)
  }

  removeProduct() {
    this.form.patchValue({producto: null})
  }

  limpiar() {
    this.form.patchValue({id_tipo_documento: 7})
    this.form.patchValue({id_proveedor: ''})
    this.form.patchValue({serie: ''})
    this.form.patchValue({correlativo: ''})
    this.form.patchValue({producto: null})
    this.initValues()
  }

  cancel() {
    this.limpiar()
  }

  save() {
    let venta = {
      id_tipo_documento: this.form.value.id_tipo_documento,
      id_puntoventa: 1,
      serie: this.form.value.serie,
      correlativo: this.form.value.correlativo,
      nombre_cliente: this.form.value.nombre_cliente,
      forma_pago: this.form.value.forma_pago,
      tipo_pago: this.form.value.tipo_pago,
      fecha_registro: this.form.value.fecha_registro.toISOString().slice(0, 10),
      gravado: 0,
      igv: this.tIgv!,
      subtotal: this.tSubtotal!,
      total: this.tTotal!,
      descuento: 0,
      incluyeigv: false,
      estado: true,
      items: this.itemsVenta,
      itemsKardex: this.itemsKardex
    }

    this._ventaService.addVenta(venta).subscribe(() => {
      this.mensajeExito("registrada")
      this.isDisabled = true
    })
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

  mensajeExito(operacion: string) {
    this._snackBar.open(`La venta fue ${operacion} con éxito`, '', {
      duration: 2000
    });
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`])
  }

  onUnidadSelected(id_unidad: number) {
    console.log(this.form.value.id_unidad)
    console.log('event unidad selected', id_unidad)
    this._precioService.getUltimoPrecio(this.producto?.id!).subscribe((data:any) => {
      let precio_unitario = 0
      if (this.producto?.id_unidad == id_unidad) {
        precio_unitario = data.precio_venta_entero
      } else {
        precio_unitario = data.precio_venta_fraccion
      }
      console.log('data precio selected', data)
      console.log('precio_unitario', precio_unitario)

      let itemProducto =  {
        precio_unitario
      }

      this.form.patchValue({
        producto: itemProducto
      })
    })
  }
}
