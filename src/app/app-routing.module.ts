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
    path: 'edit-consulta/:uid',
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
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'factura',
    loadChildren: () => import('./pages/factura/factura.module').then( m => m.FacturaPageModule)
  },
  {
    path: 'create-medicamento',
    loadChildren: () => import('./pages/medicamento/create-medicamento/create-medicamento.module').then( m => m.CreateMedicamentoPageModule)
  },
  {
    path: 'list-medicamento',
    loadChildren: () => import('./pages/medicamento/list-medicamento/list-medicamento.module').then( m => m.ListMedicamentoPageModule)
  },
  {
    path: 'delete-medicamento',
    loadChildren: () => import('./pages/medicamento/delete-medicamento/delete-medicamento.module').then( m => m.DeleteMedicamentoPageModule)
  },
  {
    path: 'create-md',
    loadChildren: () => import('./pages/medicamento-detalle/create-md/create-md.module').then( m => m.CreateMdPageModule)
  },
  {
    path: 'list-md',
    loadChildren: () => import('./pages/medicamento-detalle/list-md/list-md.module').then( m => m.ListMdPageModule)
  },
  {
    path: 'delete-md',
    loadChildren: () => import('./pages/medicamento-detalle/delete-md/delete-md.module').then( m => m.DeleteMdPageModule)
  },
  {
    path: 'create-diagnostico',
    loadChildren: () => import('./pages/diagnostico/create-diagnostico/create-diagnostico.module').then( m => m.CreateDiagnosticoPageModule)
  },
  {
    path: 'create-diagnostico/:uid',
    loadChildren: () => import('./pages/diagnostico/create-diagnostico/create-diagnostico.module').then( m => m.CreateDiagnosticoPageModule)
  },
  {
    path: 'list-diagnostico',
    loadChildren: () => import('./pages/diagnostico/list-diagnostico/list-diagnostico.module').then( m => m.ListDiagnosticoPageModule)
  },
  {
    path: 'delete-diagnostico',
    loadChildren: () => import('./pages/diagnostico/delete-diagnostico/delete-diagnostico.module').then( m => m.DeleteDiagnosticoPageModule)
  },
  {
    path: 'show-account',
    loadChildren: () => import('./pages/account/show-account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'edit-account',
    loadChildren: () => import('./pages/account/edit-account/edit-account.module').then( m => m.EditAccountPageModule)
  },
  {
    path: 'contactanos',
    loadChildren: () => import('./pages/contactanos/contactanos.module').then( m => m.ContactanosPageModule)
  },







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
