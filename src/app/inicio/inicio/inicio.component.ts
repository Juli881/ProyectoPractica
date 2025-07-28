import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../model/producto.model';
import { CarritoService } from '../../servicios/carrito.service';
import { FavoritosService } from '../../servicios/favoritos.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Guitarra eléctrica Jackson JS Series JS11',
      descripcion: 'Esta guitarra Dinky se caracteriza por su liviandad...',
      precio: 454770,
      imagen: 'assets/guitarra1.png',
      disponibilidad: true
    },
    {
      id: 2,
      nombre: 'Gibson Les Paul Standard 60s',
      descripcion: 'Una guitarra icónica con un cuerpo sólido de caoba...',
      precio: 1050000,
      imagen: 'assets/guitarra2.png',
      disponibilidad: true
    },
    {
      id: 3,
      nombre: 'Guitarra eléctrica Yamaha ERG121',
      descripcion: 'Guitarra eléctrica de cuerpo sólido, diseño clásico, con buen sonido para principiantes y músicos intermedios.',
      precio: 1350000,
      imagen: 'assets/guitarra7.jpg',
      disponibilidad: true
    },
    {
      id: 4,
      nombre: 'PRS SE Custom 24',
      descripcion: 'Versátil guitarra con cuerpo de caoba y mástil de arce.',
      precio: 980000,
      imagen: 'assets/guitarra10.png',
      disponibilidad: true
    },
    {
      id: 5,
      nombre: 'Ibanez RG550',
      descripcion: 'Guitarra eléctrica de alta velocidad con puente flotante y pastillas humbucker.',
      precio: 820000,
      imagen: 'assets/guitarra5.png',
      disponibilidad: true
    }
  ];

  constructor(
    private carritoService: CarritoService,
    private favoritosService: FavoritosService
  ) {}

  agregarAlCarrito(producto: Producto): void {
    if (producto.disponibilidad) {
      this.carritoService.agregarAlcarrito(producto);
      alert('Producto agregado al carrito');
    }
  }

  agregarAFavoritos(producto: Producto): void {
    if (producto.disponibilidad) {
      this.favoritosService.agregarAFavoritos(producto);
      alert('Producto agregado a favoritos');
    }
  }
}
