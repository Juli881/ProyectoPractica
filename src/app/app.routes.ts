import { Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio/inicio.component';
import { ContactoComponent } from './formulario/contacto/contacto.component';
import path from 'path';

export const routes: Routes = [
    {path:"",redirectTo:`/inicio`, pathMatch:`full`},

    {path:'inicio',component:InicioComponent},

    {path:'contacto',component:ContactoComponent},


];
