import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Producto } from '../model/producto.model';
import { CarritoService } from '../servicios/carrito.service';

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
      nombre: 'Brr brr patapim',
      descripcion: '',
      precio: 29.99,
      imagen: 'assets/brr brr patapim.jpg',
      disponibilidad: true
    },
    {
      id: 2,
      nombre: 'Reloj Deportivo',
      descripcion: 'Ideal para entrenamientos intensos, resistente al agua.',
      precio: 45.00,
      imagen: 'https://via.placeholder.com/280x180?text=Reloj',
      disponibilidad: true
    },
    {
      id: 3,
      nombre: 'Auriculares Bluetooth',
      descripcion: 'Sonido envolvente con cancelación de ruido.',
      precio: 59.99,
      imagen: 'https://via.placeholder.com/280x180?text=Auriculares',
      disponibilidad: false
    }
  ];

  constructor(private carritoService: CarritoService) {}

  agregar(producto: Producto): void {
    if (producto.disponibilidad) {
      this.carritoService.agregarAlcarrito(producto);
      alert('Producto agregado al carrito');
    } else {
      alert('Producto no disponible');
    }
  }
}
