import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SesionGuard } from './guards/sesion.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'galeria',
    loadChildren: () => import('./galeria/galeria.module').then( m => m.GaleriaPageModule)
  },
  {
    path: 'denuncias',
    loadChildren: () => import('./denuncias/denuncias.module').then( m => m.DenunciasPageModule)
  },
  {
    path: 'sugerencias',
    loadChildren: () => import('./sugerencias/sugerencias.module').then( m => m.SugerenciasPageModule)
  },
  {
    path: 'recicladoras',
    loadChildren: () => import('./recicladoras/recicladoras.module').then( m => m.RecicladorasPageModule)
  },
  {
    path: 'agregar-rec',
    loadChildren: () => import('./agregar-rec/agregar-rec.module').then( m => m.AgregarRecPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'administrador', canActivate: [SesionGuard],    
    loadChildren: () => import('./administrador/administrador.module').then( m => m.AdministradorPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
