import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  productos: Producto[] = [
    {
      id: 1,
      nombre: '',
      descripcion: '',
      precio: 29,
      imagen: '',
      disponibilidad: true
    }
  ]
  constructor(private carritoService: carritoService) { }

  agregar(producto: Producto) {
    this.carritoService.agregarAlCarrito(producto)
    alert('Producto agregado al carrito')

  }
}