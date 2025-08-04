import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private nombreUsuario = new BehaviorSubject<string>('Usuario');
  nombreUsuario$ = this.nombreUsuario.asObservable();

  setNombre(nombre: string): void {
    this.nombreUsuario.next(nombre);
  }
}
