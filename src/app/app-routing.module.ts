import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CadastroFuncionarioComponent } from './cadastro-funcionario/cadastro-funcionario.component';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { CadastroFuncionarioInternoComponent } from './cadastro-funcionario-interno/cadastro-funcionario-interno.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path: 'cadastro-funcionario', component: CadastroFuncionarioComponent},
  {path: 'cadastro-empresa', component: CadastroEmpresaComponent},
  {path: 'cadastro-funcionario-interno', component: CadastroFuncionarioInternoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
