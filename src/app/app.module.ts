import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RodapeComponent } from './rodape/rodape.component';
import { HomeComponent } from './home/home.component';
import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
import { FuncionarioService } from './services/funcionario-service.service';
import { CadastroFuncionarioComponent } from './cadastro-funcionario/cadastro-funcionario.component';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { CadastroFuncionarioInternoComponent } from './cadastro-funcionario-interno/cadastro-funcionario-interno.component';
import { CadastroFrotaComponent } from './cadastro-frota/cadastro-frota.component';
import { CadastroRegistroComponent } from './cadastro-registro/cadastro-registro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RodapeComponent,
    HomeComponent,
    CadastroFuncionarioComponent,
    CadastroEmpresaComponent,
    CadastroFuncionarioInternoComponent,
    CadastroFrotaComponent,
    CadastroRegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppBootstrapModule
  ],
  providers: [FuncionarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
