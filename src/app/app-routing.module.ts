import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CadastroFuncionarioComponent } from './cadastro-funcionario/cadastro-funcionario.component';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path: 'cadastro-funcionario', component: CadastroFuncionarioComponent},
  {path: 'cadastro-empresa', component: CadastroEmpresaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
