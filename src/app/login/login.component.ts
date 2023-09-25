import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from '../services/funcionario-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private route:Router, private funcionario_service: FuncionarioService){}

  funcionario_login: {login: string; senha: string} = {login: '', senha: ''}
  info: any;

  getLogin(){
    
  }

}
