import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent implements OnInit {
  productoForm: FormGroup;
  productoId: number | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(0)]],
      imagenUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtener el ID de la ruta si existe
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      this.productoId = parseInt(idParam, 10);
      this.isEditMode = true;
      this.loadProducto();
    }
  }

  loadProducto(): void {
    if (this.productoId !== null) {
      const producto = this.productoService.getProductoById(this.productoId);
      
      if (producto) {
        // Cargar los datos del producto en el formulario
        this.productoForm.patchValue({
          nombre: producto.nombre,
          precio: producto.precio,
          imagenUrl: producto.imagenUrl
        });
      } else {
        // Si el producto no existe, redirigir a la lista
        console.error('Producto no encontrado');
        this.router.navigate(['/productos']);
      }
    }
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      const productoData: Producto = {
        ...this.productoForm.value,
        id: this.productoId || 0
      };

      if (this.isEditMode && this.productoId !== null) {
        // Actualizar producto existente
        this.productoService.updateProducto(productoData);
        console.log('Producto actualizado:', productoData);
      } else {
        // Crear nuevo producto
        this.productoService.addProducto(productoData);
        console.log('Producto creado:', productoData);
      }

      // Redirigir a la lista de productos después de guardar
      this.router.navigate(['/productos']);
    }
  }

  resetForm(): void {
    this.productoForm.reset();
  }
}