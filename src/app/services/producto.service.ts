import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos: Producto[] = [];

  constructor() { 
    this.productos = [
      {
        id: 3,
        nombre: 'Samsung Galaxy S24',
        precio: 899.99,
        imagenUrl: 'https://picsum.photos/seed/samsung1/300/200'
      },
      {
        id: 4,
        nombre: 'Auriculares Sony WH - XM5',
        precio: 399.99,
        imagenUrl: 'https://picsum.photos/seed/headphones1/300/200'
      },
      {
        id: 5,
        nombre: 'Monitor LG UltraWide 34"',
        precio: 549.99,
        imagenUrl: 'https://picsum.photos/seed/monitor1/300/200'
      },
      {
        id: 6,
        nombre: 'Teclado Mecánico Logitech',
        precio: 149.99,
        imagenUrl: 'https://picsum.photos/seed/keyboard1/300/200'
      },
      {
        id: 7,
        nombre: 'Altavoz JBL Boombox',
        precio: 299.99,
        imagenUrl: 'https://picsum.photos/seed/speaker1/300/200'
      }      
    ];
  }

  getProductos(): Producto[] {
    return this.productos;
  }

  addProducto(producto: Producto): void {
    console.log('Formulario recibido:', producto);
    const maxId = Math.max(...this.getProductos().map(producto => producto.id));
    producto.id = maxId + 1;
    this.productos.push(producto);
  }

  getProductoById(id: number): Producto | undefined {
    return this.productos.find(producto => producto.id === id);
  }

  updateProducto(productoActualizado: Producto): void {
    const index = this.productos.findIndex(producto => producto.id === productoActualizado.id);
    if (index !== -1) {
      this.productos[index] = productoActualizado;
    }
  }

  deleteProduct(id: number): void {
    this.productos = this.productos.filter(producto => producto.id !== id);
  }

}