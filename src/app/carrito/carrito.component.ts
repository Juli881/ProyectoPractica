import { Component, Injectable, OnInit } from '@angular/core';
import { Producto } from '../model/producto.model';
import { CarritoService } from '../servicios/carrito.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class CarritoComponent implements OnInit {
  productosEnCarrito: { producto: Producto; cantidad: number; editando?: boolean }[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe((productos) => {
      this.productosEnCarrito = productos.map(item => ({
        ...item,
        editando: false // inicializamos la propiedad 'editando' en falso
      }));
    });
  }

  agregarCantidad(index: number) {
    this.productosEnCarrito[index].cantidad++;
  }

  quitarCantidad(index: number) {
    if (this.productosEnCarrito[index].cantidad > 1) {
      this.productosEnCarrito[index].cantidad--;
    }
  }

  // Activa el modo de edición de la cantidad
  activarEdicion(index: number) {
    this.productosEnCarrito[index].editando = true;
  }

  // Desactiva el modo de edición y confirma el valor ingresado
  desactivarEdicion(index: number) {
    const cantidad = this.productosEnCarrito[index].cantidad;
    if (cantidad < 1) {
      // Si la cantidad es menor que 1, resetea la cantidad a 1
      this.productosEnCarrito[index].cantidad = 1;
    }
    this.productosEnCarrito[index].editando = false;
  }

  // Maneja el cambio de valor cuando el usuario ingresa una nueva cantidad
  onCantidadChange(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const cantidad = parseInt(input.value, 10);
    // Aseguramos que la cantidad no sea menor a 1
    if (!isNaN(cantidad) && cantidad >= 1) {
      this.productosEnCarrito[index].cantidad = cantidad;
    }
  }

  eliminarProducto(productoId: number) {
    this.carritoService.eliminarDelCarrito(productoId);
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
  }

  realizarCompra() {
    alert('Compra realizada');
    this.vaciarCarrito();
  }
}
