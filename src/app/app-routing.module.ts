import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path:'tabs',
    loadChildren:() => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'evento/:id',  // Asegúrate de que esta ruta esté configurada para recibir el ID
    loadChildren: () => import('./evento/evento.module').then(m => m.EventoPageModule),
  },
  {
    path: 'pw-update',
    loadChildren: () => import('./pw-update/pw-update.module').then( m => m.PwUpdatePageModule)
  },
  {
    path: 'event-management',
    loadChildren: () => import('./event-management/event-management.module').then( m => m.EventManagementPageModule)
  },
  {
    path: 'event-edit/:id', // Ruta dinámica con el parámetro `id`
    loadChildren: () => import('./event-edit/event-edit.module').then(m => m.EventEditPageModule),
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}