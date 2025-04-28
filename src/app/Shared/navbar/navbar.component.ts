import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [RouterLink,CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
cantidadProductos:number = 0;
constructor(private carritoservice: CarritoService){}

ngOnInit(): void {  
  //Escucha los cambios en el carrito para actualizar la cantidad de productos
this.carritoservice.carrito$.subscribe((productos: { Producto: Producto, cantidad: number}[])=>{
this.cantidadProductos = productos.reduce((total, item) => total + item.cantidad,0)
})
}
onCarritoClick(){
  console.log('carrito clicked')
}
}
