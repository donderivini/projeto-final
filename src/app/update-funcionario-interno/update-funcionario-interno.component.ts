import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from '../services/funcionario-service.service';
@Component({
  selector: 'app-update-funcionario-interno',
  templateUrl: './update-funcionario-interno.component.html',
  styleUrls: ['./update-funcionario-interno.component.css']
})
export class UpdateFuncionarioInternoComponent {


  constructor(private router:Router,private funcionario_service:FuncionarioService){}

  funcUpdate = {nome:'',senha:'',email:'',cargo:''}

  setUpdateInterno(){
    // this.funcionario_service.updateInterno(this.funcUpdate)
  }

  setDeleteInterno(){}


  btCancelar(){
    this.router.navigate(['/home'])
  }

}
