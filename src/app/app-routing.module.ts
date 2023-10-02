import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CadastroFuncionarioComponent } from './cadastro-funcionario/cadastro-funcionario.component';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { CadastroFuncionarioInternoComponent } from './cadastro-funcionario-interno/cadastro-funcionario-interno.component';
import { CadastroFrotaComponent } from './cadastro-frota/cadastro-frota.component';
import { CadastroRegistroComponent } from './cadastro-registro/cadastro-registro.component';
import { UpdateFuncionarioInternoComponent } from './update-funcionario-interno/update-funcionario-interno.component';
import { UpdateFuncionarioComponent } from './update-funcionario/update-funcionario.component';
import { UpdateEmpresaComponent } from './update-empresa/update-empresa.component';
import { UpdateFrotaComponent } from './update-frota/update-frota.component';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path: 'cadastro-funcionario', component: CadastroFuncionarioComponent},
  {path: 'cadastro-empresa', component: CadastroEmpresaComponent},
  {path: 'cadastro-funcionario-interno', component: CadastroFuncionarioInternoComponent},
  {path: 'cadastro-frota', component: CadastroFrotaComponent},
  {path: 'cadastro-registro', component: CadastroRegistroComponent},
  {path: 'update-funcionario-interno', component: UpdateFuncionarioInternoComponent},
  {path: 'update-funcionario', component: UpdateFuncionarioComponent},
  {path: 'update-empresa', component: UpdateEmpresaComponent},
  {path: 'update-frota', component: UpdateFrotaComponent},
  {path: 'meu-perfil', component: MeuPerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
