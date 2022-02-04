import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ----------------- COMPONENTS
import { HomeComponent } from './pages/crud/home.component';
import { ProductsComponent } from './pages/starwars/products.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'crud', component: HomeComponent},
  {path:'starwars', component: ProductsComponent},
  {path: '**', redirectTo: '404', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
