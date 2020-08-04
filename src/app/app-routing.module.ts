import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },  {
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
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
