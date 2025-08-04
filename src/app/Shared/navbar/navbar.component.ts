import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Producto } from '../../model/producto.model';
import { CarritoService } from '../../servicios/carrito.service';
import { UsuarioComponent } from '../../usuario/usuario.component';
import { UsuarioService } from '../../servicios/usuario.service'; // ⬅️ IMPORTANTE

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule, UsuarioComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cantidadProductos: number = 0;
  nombreUsuario: string = 'Usuario';

  // ⬅️ Agregá el servicio al constructor
  constructor(
    private carritoservice: CarritoService,
    private usuarioService: UsuarioService // ⬅️ Agregado
  ) {}

  ngOnInit(): void {
    // Carrito
    this.carritoservice.carrito$.subscribe((productos: { producto: Producto, cantidad: number }[]) => {
      this.cantidadProductos = productos.reduce((total, item) => total + item.cantidad, 0);
    });

    
    this.usuarioService.nombreUsuario$.subscribe(nombre => {
      this.nombreUsuario = nombre;
    });
  }

  onCarritoClick() {
    console.log('carrito clicked');
  }

  cambiarFondo() {
    let toggle: HTMLInputElement | null = document.getElementById('toggle') as HTMLInputElement;
    let label_toggle: HTMLInputElement | null = document.getElementById('label_toggle') as HTMLInputElement;
    if (toggle) {
      let checked: boolean = toggle.checked;
      document.body.classList.toggle('dark-mode', checked);
      if (checked) {
        label_toggle!.innerHTML = '<i class = "fa-solid fa-sun"></i>';
      } else {
        label_toggle!.innerHTML = '<i class = "fa-regular fa-moon"></i>';
      }
    }
  }
}
