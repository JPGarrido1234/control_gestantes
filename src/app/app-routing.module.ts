import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./pages/ajustes/ajustes.module').then( m => m.AjustesPageModule)
  },  {
    path: 'escaner',
    loadChildren: () => import('./pages/escaner/escaner.module').then( m => m.EscanerPageModule)
  },
  {
    path: 'recipiente',
    loadChildren: () => import('./pages/recipiente/recipiente.module').then( m => m.RecipientePageModule)
  },
  {
    path: 'escaner-bebe',
    loadChildren: () => import('./pages/escaner-bebe/escaner-bebe.module').then( m => m.EscanerBebePageModule)
  },
  {
    path: 'escaner-lista',
    loadChildren: () => import('./pages/escaner-lista/escaner-lista.module').then( m => m.EscanerListaPageModule)
  },
  {
    path: 'correct',
    loadChildren: () => import('./pages/correct/correct.module').then( m => m.CorrectPageModule)
  },
  {
    path: 'fail',
    loadChildren: () => import('./pages/fail/fail.module').then( m => m.FailPageModule)
  },
  {
    path: 'resumen-tomas',
    loadChildren: () => import('./pages/resumen-tomas/resumen-tomas.module').then( m => m.ResumenTomasPageModule)
  },
  {
    path: 'notif-tomas',
    loadChildren: () => import('./pages/notif-tomas/notif-tomas.module').then( m => m.NotifTomasPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
