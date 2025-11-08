import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoCardComponent } from '../producto-card/producto-card.component';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-producto-list',
  imports: [CommonModule, ProductoCardComponent],
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.css'
})
export class ProductoListComponent implements OnInit {
  // Inicializamos la propiedad como un array vacío
  productos: Producto[] = [];

  // Inyectamos el servicio en el constructor
  constructor(private productoService: ProductoService) {}

  // Usamos ngOnInit para obtener los datos del servicio
  ngOnInit(): void {
    this.productos = this.productoService.getProductos();
  }

  onProductoEliminado(id: number): void {
    // Actualizamos la lista de productos después de eliminar
    this.productos = this.productoService.getProductos();
  }

}
