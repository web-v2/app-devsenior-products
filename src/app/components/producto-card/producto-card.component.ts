import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../interfaces/producto'; // Importamos la interfaz Producto
import { ProductoService } from '../../services/producto.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-card.component.html',
  styleUrl: './producto-card.component.css'
})
export class ProductoCardComponent {
  // Con @Input, este componente recibe un objeto 'producto' del componente padre
  @Input() producto!: Producto;
  
  // EventEmitter para notificar al componente padre cuando se elimina un producto
  @Output() productoEliminado = new EventEmitter<number>();

  router: Router = inject(Router);

  constructor(private productoService: ProductoService) {}

  eliminar(): void {
    this.productoService.deleteProduct(this.producto.id);
    this.productoEliminado.emit(this.producto.id);
  }

  editar(): void{
    const id = this.producto.id    
    this.router.navigate([`productos/${id}`])
  }
}
