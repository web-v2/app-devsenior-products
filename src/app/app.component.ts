import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-devsenior-products';  

  router: Router = inject(Router);

  navigateToProductos() {
    this.router.navigate(['/productos']);
  }
  navigateToNuevoProducto() {
    this.router.navigate(['/productos/nuevo']);
  }
}
