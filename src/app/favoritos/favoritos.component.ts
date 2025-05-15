import { Component, Injectable, OnInit } from '@angular/core';
import { Producto } from '../model/producto.model';
import { FavoritosService } from '../servicios/favoritos.service';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class FavoritosComponent implements OnInit {
  productosEnFavorito: { producto: Producto; cantidad: number }[] = [];

  constructor(private FavoritosService: FavoritosService) {}

ngOnInit(): void {
  this.FavoritosService.favoritos$.subscribe((productos) => {
    this.productosEnFavorito = productos;
  });
}


  agregarCantidad(index: number) {
    this.productosEnFavorito[index].cantidad++;
  }

  quitarCantidad(index: number) {
    if (this.productosEnFavorito[index].cantidad > 1) {
      this.productosEnFavorito[index].cantidad--;
    }
  }

  eliminarFavorito(productoId: number) {
    this.FavoritosService.eliminarFavorito(productoId);
  }

  vaciarFavorito() {
    this.FavoritosService.vaciarFavorito();
  }

  realizarFavorito() {
    alert('Añadido a favoritos');
    this.vaciarFavorito();
  }
}