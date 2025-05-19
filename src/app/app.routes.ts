import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { ContactoComponent } from './formulario/contacto/contacto.component';
import { ProductosComponent } from './productos/productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { Component } from '@angular/core';


export const routes: Routes = [
    { path: "", redirectTo:'/inicio' ,pathMatch:'full' },

    { path: 'inicio', component: InicioComponent },

    { path: 'contacto', component: ContactoComponent },

    { path: 'productos', component: ProductosComponent },

    { path: 'carrito', component: CarritoComponent },

    { path: 'favoritos', component: FavoritosComponent }
];
