import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'create-consulta',
    loadChildren: () => import('./pages/consulta/create-consulta/create-consulta.module').then( m => m.CreateConsultaPageModule)
  },
  {
    path: 'list-consulta',
    loadChildren: () => import('./pages/consulta/list-consulta/list-consulta.module').then( m => m.ListConsultaPageModule)
  },
  {
    path: 'edit-consulta',
    loadChildren: () => import('./pages/consulta/edit-consulta/edit-consulta.module').then( m => m.EditConsultaPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'type-of-register',
    loadChildren: () => import('./pages/register/type-of-register/type-of-register.module').then( m => m.TypeOfRegisterPageModule)
  },
  {
    path: 'form-register',
    loadChildren: () => import('./pages/register/form-register/form-register.module').then( m => m.FormRegisterPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
