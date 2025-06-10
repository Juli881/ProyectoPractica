import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CarritoService } from '../../servicios/carrito.service';
import { privateDecrypt } from 'crypto';
import jsPDF from 'jspdf';
import { url } from 'inspector';
import { ifError } from 'assert';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent implements OnInit {
  //declaracion de formulario reactivo para la compra
  formularioCompra!: FormGroup;
  //variable para almacenar el total de la compra
  total!: number
  //costo fijo
  envio = 1500
  //indicador para saber si la factura ya fue generada
  facturaGenerada = false
  //objeto que contiene la información de la factura generada
  factura: any;
  //controla la visibilidad del modal que muestra el PDF 
  mostrarModal = false;
  //fuente segura para mostrar el PDF generado en el inframe(URL sanitizada)
  pdfSrc: SafeResourceUrl | undefined;
  constructor(
    private fb: FormBuilder, // formbuilder para crear el formulario reactivo
    private carritoService: CarritoService, //servicio para manejar el carrito y obtener producto
    private sanitizer: DomSanitizer //para sanitizar la URL del PDF y que angular lo permita mostrar
  ) { }
  //Metodo que se ejecuta al inicializar el componente 
  ngOnInit(): void {
    //formulario con los campos requeridos y validadores
    this.formularioCompra = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', Validators.required, Validators.email],
      telefono: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
      metodoPago: ['', Validators.required],
    })
  }
  //calcular el total de la compra sumando el subtotal y el costo de envio
  calcularTotal(): number {
    const subtotal = this.carritoService.obtenerTotal()//obtiene el subtotal del carrito
    this.total = subtotal + this.envio;
    return this.total
  }
  //prepara los dtps para la factura con clietne, productos, totales y fecha
  emitirFacturas(): void {
    const datosCliente = this.formularioCompra.value;//datos ingresados en el formulario
    const productos = this.carritoService.obtenerProductos();//productos del carrito
    const totalFinal = this.calcularTotal();//total calculado con envio
    //construye el objeto factura con toda la info necesaria
    this.factura = {
      cliente: datosCliente,
      productos: productos,
      envio: this.envio,
      total: totalFinal,
      fecha: new Date()
    }
    //marca que la factura fue generada
    this.facturaGenerada = true
  }
  //metodo que se ejecut al finbalizar la compra (click en el boton)
  //verifica validez del formulario, genera factura y muestra PDF
  finalizarCompra(): void {
    if (this.formularioCompra.valid) {
      this.emitirFacturas();//crea la facrura
      this.generarPDFModal();//genera y muestra el PDF en el modal
    } else {
      this.formularioCompra.markAllAsTouched();//marca todos los campos como tocados para mostar errores
    }
  }
  //genera el PDF con jsPDF y crea la url para mostrar en el inframe dentro del modal
  generarPDFModal(): void {
    if (!this.factura) return; //si no hay factura, no hacer factura
    const doc = new jsPDF(); //crea instancia de jsPDF
    //agrega titulo y fecha al pdf
    doc.setFontSize(18);
    doc.text('factura de compra', 14, 20);
    doc.setFontSize(12);
    doc.text(`fecha: ${this.factura.fecha.toLocaleString()}`, 14, 30)

    //informacion del cliente
    doc.text('cliente', 14, 20);
    const c = this.factura.cliente
    doc.text(`nombre ${c.nombre}`, 14, 20);
    doc.text(`direccion ${c.direccion}`, 14, 20);
    doc.text(`correo ${c.correo}`, 14, 20);
    doc.text(`telefono ${c.ciudad}`, 14, 20);
    doc.text(`ciudad ${c.ciudad}`, 14, 20);
    doc.text(`provincia ${c.provincia}`, 14, 20);
    doc.text(`codigo postal ${c.codigoPostal}`, 14, 20);

    //listado de productos con calidad, precio y subtotal
    let y = 120
    doc.text('productos', 14, y);
    this.factura.productos.forEach((item: any, index: number) => {
      y += 10;
      doc.text(
        `${index + 1}.${item.producto.nombre} - Cantidad: ${item.Cantidad} - precio: $${item.producto.precio.toFixed(2)} - SubTotal: $${(item.producto.precio * item.Cantidad).toFixed(2)}`,
        20,
        y
      )
    })

    //costos finales
    doc.text(`Costo de envio: $${this.factura.envio.toFixed(2)}`, 14, y)
    y += 10;
    doc.text(`total a pagar: $${this.factura.total.toFixed(2)}`, 14, y)
    const pdfBlob = doc.output('blob');
    this.pdfSrc = this, this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob))
    //abre el modal que contiene el PDF
    this.mostrarModal = true;
  }
  //metodo para cerrar el modal y liberar la URL del PDF para evitar fugas de memoria 
  cerrarModal(): void {
    this.mostrarModal = false
    if (this.pdfSrc) {
      URL.revokeObjectURL((this.pdfSrc as any).changingThisBreaksApplicationSecurity)
      this.pdfSrc = undefined;
    }
  }
  //metodo para imprimir el PDF que esta cargando dentro del inframe en la vista
  imprimirPDF(): void {
    //obtiene la referencia al elemento inframe del DOMmediante su ID 'pdfFrame'
    //puede devolver null si no encuentra el elemento
    const iframe = document.getElementById('pdfFrame') as HTMLIFrameElement | null;
    if (iframe && iframe.contentWindow) {
      //le da foco al contenido del iframe para asegurarse que la ventan correcta esta activa para imprimir
      iframe.contentWindow.focus();
    }
  }
}