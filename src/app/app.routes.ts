import { Routes } from '@angular/router';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { ProductoListComponent } from './components/producto-list/producto-list.component';

export const routes: Routes = [      
    { path: 'productos', component: ProductoListComponent },
    { path: 'productos/nuevo', component: ProductoFormComponent },
    { path: 'productos/:id', component: ProductoFormComponent },
    { path: '', redirectTo: 'productos', pathMatch: 'full' },
];
