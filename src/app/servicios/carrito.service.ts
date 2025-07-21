import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../model/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoSubject = new BehaviorSubject<{ producto: Producto; cantidad: number }[]>([]);
  carrito$ = this.carritoSubject.asObservable()

  agregarAlcarrito(producto: Producto) {
    const productos = this.carritoSubject.getValue();
    const encontrado = productos.find(p => p.producto.id === producto.id)

    if (encontrado) {
      encontrado.cantidad++
    } else {
      this.carritoSubject.next([...productos, { producto, cantidad: 1 }])

    }
  }

  eliminarDelCarrito(productoId: number) {
    const productos = this.carritoSubject.getValue().filter(p => p.producto.id !== productoId)
    this.carritoSubject.next(productos)
  }
  vaciarCarrito() {
    this.carritoSubject.next([])
  }
//Borra todos los productos del carrito y emite un arreglo vacío.


  //Metodo para actualizar la cantidad de un producto en el carrito 
  actualizarCantidad(productoId: number, nuevaCantidad: number) {
    // Recorremos el carrito y actualizamos la cantidad del producto con el ID dado
    const productos = this.carritoSubject.getValue().map(item => {
      if (item.producto.id === productoId) {
        // Busca el producto por ID y actualiza su cantidad
        return { ...item, cantidad: nuevaCantidad }
      }
      // Cambia la cantidad de ese producto por la nueva cantidad que le indicaste.
      //
      return item // Si no es el producto buscado, lo deja como esta
    })
    // Emitimos el nuevo estado del carrito (BehaviorSubject)
    this.carritoSubject.next(productos)
  }

  // Metodo para obtener los productos del carrito como un arreglo
  obtenerProductos(): { producto: Producto; cantidad: number }[] {
    return this.carritoSubject.getValue();
  }

  // Metodo para calcular el total a pagar (precio * cantidad de cada producto)
  obtenerTotal(): number {
    const productos = this.carritoSubject.getValue();
    // Usamos reduce para sumar los subtotales de cada producto
    return productos.reduce((total, item) => total + item.producto.precio * item.cantidad, 0)
  }
}