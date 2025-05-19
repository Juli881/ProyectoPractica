import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Producto } from '../../model/producto.model';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] 
})
export class NavbarComponent implements OnInit {
  cantidadProductos: number = 0;

  constructor(private carritoservice: CarritoService) {}

  ngOnInit(): void {
    
    this.carritoservice.carrito$.subscribe((productos: { producto: Producto, cantidad: number }[]) => {
      this.cantidadProductos = productos.reduce((total, item) => total + item.cantidad, 0);
    });
  }

  onCarritoClick() {
    console.log('carrito clicked');
  }
}

