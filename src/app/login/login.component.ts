import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from '../services/funcionario-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router:Router, private funcionario_service: FuncionarioService){}

  funcLogin= {login: '', senha: ''}

  funcionario: any;

  getLogin(){
    this.funcionario_service.login(this.funcLogin).subscribe({
      next: (data) => {
        console.log('data',data)
        if (data != null){
          this.funcionario_service.setFuncionario(data)
          this.router.navigate(['/home'])
        }
        else{
          this.funcionario_service.setFuncionario(null)
          window.alert('Login inexistente')
        }
      },
      error: (err) => {
        console.log('error', err)
        this.funcionario_service.setFuncionario(null)
        window.alert('Ocorreu um erro de conexão')
      },
      complete: () => console.log('Completo')
    })
  }

}
