import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent {
  productoForm: FormGroup;

  // El FormBuilder simplifica la creación de formularios reactivos
  constructor(private fb: FormBuilder, private productoService: ProductoService) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(0)]],
      imagenUrl: ['', Validators.required]
    });
  }

  onSubmit() {
    // Verificamos si el formulario es válido antes de enviar
    if (this.productoForm.valid) {
      console.log('Formulario enviado:', this.productoForm.value);
      this.productoService.addProducto(this.productoForm.value);
      this.resetForm();
    }
  }

  resetForm() {
    this.productoForm.reset();
  }
}