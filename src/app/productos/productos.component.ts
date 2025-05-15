import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Producto } from '../model/producto.model';
import { CarritoService } from '../servicios/carrito.service';
import { FavoritosService } from '../servicios/favoritos.service';

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
      nombre: 'Producto 2',
      descripcion: 'Un producto',
      precio: 15000.00,
      imagen: 'assets/brr brr patapim.jpg',
      disponibilidad: true
    },
    {
      id: 3,
      nombre: 'si',
      descripcion: 'Un producto',
      precio: 14000.99,
      imagen: 'assets/brr brr patapim.jpg',
      disponibilidad: true
    },
    {
      id: 4,
      nombre: 'si',
      descripcion: 'Un producto',
      precio: 14000.99,
      imagen: 'assets/brr brr patapim.jpg',
      disponibilidad: true
    },
    {
      id: 5,
      nombre: 'si',
      descripcion: 'Un producto',
      precio: 14000.99,
      imagen: 'assets/brr brr patapim.jpg',
      disponibilidad: false
    }
  ];

  constructor( private carritoService: CarritoService,
  private FavoritosService: FavoritosService ) { }

  agregar(producto: Producto): void {
    if (producto.disponibilidad) {
      this.carritoService.agregarAlcarrito(producto);
      alert('Producto agregado al carrito');
    } else {
      alert('Producto no disponible');
    }
  }
agregarAFavoritos(producto: Producto): void {
  if (producto.disponibilidad) {
    this.FavoritosService.agregarAFavoritos(producto);
    alert('Producto agregado a favoritos');
  } else {
    alert('Producto no disponible');
  }
}
}
