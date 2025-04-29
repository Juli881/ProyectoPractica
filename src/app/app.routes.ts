import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { ContactoComponent } from './formulario/contacto/contacto.component';
import { Component } from '@angular/core';


export const routes: Routes = [
    { path: "", component: InicioComponent },
    

    {path:'inicio',component:InicioComponent},

    {path:'contacto',component:ContactoComponent},


];
