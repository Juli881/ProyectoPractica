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
      nombre: 'Guitarra eléctrica Jackson JS Series JS11',
      descripcion: 'Esta guitarra Dinky se caracteriza por su liviandad, al ser más pequeña que el resto. Esto permite comodidad en el juego sin descuidar la excelencia en el sonido para que des todo en el escenario.',
      precio: 454770,
      imagen: 'assets/guitarra1.png',
      disponibilidad: true
    },
    {
      id: 2,
      nombre: 'Gibson Les Paul Standard 60s',
      descripcion: 'Una guitarra icónica con un cuerpo sólido de caoba, tapa de arce y pastillas Burstbucker que ofrecen un tono clásico con sustain infinito.',
      precio: 1050000,
      imagen: 'assets/guitarra2.png',
      disponibilidad: true
    },
    {
      id: 3,
      nombre: 'Fender Stratocaster Player Series',
      descripcion: 'Cuerpo de aliso, mástil en forma de "C moderna", y tres pastillas single coil. Perfecta para blues, rock y funk.',
      precio: 699000,
      imagen: 'assets/guitarra3.jpg',
      disponibilidad: true
    },
    {
      id: 4,
      nombre: 'Ibanez RG450DX',
      descripcion: 'Diseñada para velocidad y técnica, con trémolo Edge-Zero II y mástil Wizard III ultrarápido.',
      precio: 350000,
      imagen: 'assets/guitarra4.png',
      disponibilidad: true
    },
    {
      id: 5,
      nombre: 'Kramer Original Collection VT-211S',
      descripcion: 'Guitarra estilo Strat con gran versatilidad. Ideal para principiantes y músicos intermedios.',
      precio: 240000,
      imagen: 'assets/guitarra5.png',
      disponibilidad: true
    },
    {
      id: 6,
      nombre: 'ESP LTD EC-256',
      descripcion: 'Con cuerpo tipo Les Paul, pastillas humbucker y diseño moderno. Gran relación calidad-precio.',
      precio: 290000,
      imagen: 'assets/guitarra6.png',
      disponibilidad: true
    },
    {
      id: 7,
      nombre: 'Yamaha Pacifica 112V',
      descripcion: 'Guitarra ideal para iniciarse, con gran tono y excelente construcción.',
      precio: 180000,
      imagen: 'assets/guitarra7.jpg',
      disponibilidad: true
    },
    {
      id: 8,
      nombre: 'PRS SE Standard 24',
      descripcion: 'Con pastillas humbucker y trémolo, es una opción versátil para diversos estilos musicales.',
      precio: 410000,
      imagen: 'assets/guitarra8.png',
      disponibilidad: true
    }
  ];

  // Seccion: Amplificadores
  amplificadores: Producto[] = [
    {
      id: 101,
      nombre: 'Fender Champion 40',
      descripcion: 'Amplificador versátil con efectos integrados, ideal para práctica y escenario.',
      precio: 124999,
      imagen: 'assets/champion40.png',
      disponibilidad: true
    },
    {
      id: 102,
      nombre: 'Marshall MG15GFX',
      descripcion: 'Compacto pero potente, con efectos digitales y diseño clásico Marshall.',
      precio: 99999,
      imagen: 'assets/marshall_mg15gfx.png',
      disponibilidad: true
    },
    {
      id: 103,
      nombre: 'Boss Katana 50 MKII',
      descripcion: 'Amplificador de modelado digital con 50W de potencia y gran respuesta dinámica.',
      precio: 159999,
      imagen: 'assets/katana50.png',
      disponibilidad: true
    },
    {
      id: 104,
      nombre: 'Orange Crush 20RT',
      descripcion: 'Sonido británico con distorsión poderosa y afinador incorporado.',
      precio: 114999,
      imagen: 'assets/orange_crush20.png',
      disponibilidad: true
    }
  ];

  constructor(
    private carritoService: CarritoService,
    private FavoritosService: FavoritosService
  ) {}

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
