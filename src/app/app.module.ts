import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Módulos
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// Componentes
import { AppComponent } from './app.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AgregarEditarConsultaComponent } from './components/_agregar-editar-consulta/agregar-editar-consulta.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AgregarProductoRecetaComponent } from './components/agregar-producto-receta/agregar-producto-receta.component';
import { BuscarProductoComponent } from './components/buscar-producto/buscar-producto.component';
import { PdfKardexComponent } from './components/pdf-kardex/pdf-kardex.component';
import { ListKardexProductoComponent } from './components/list-kardex-producto/list-kardex-producto.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AgregarEditarConsultaComponent,
    ConfirmDialogComponent,
    AgregarProductoRecetaComponent,
    BuscarProductoComponent,
    PdfKardexComponent,
    ListKardexProductoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [{
    provide: MAT_DATE_LOCALE, useValue: 'es'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
