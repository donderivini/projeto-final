import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrosServiceService } from '../services/registros-service.service';
import { FuncionarioService } from '../services/funcionario-service.service';

@Component({
  selector: 'app-consulta-registro',
  templateUrl: './consulta-registro.component.html',
  styleUrls: ['./consulta-registro.component.css']
})
export class ConsultaRegistroComponent implements OnInit {
  
  constructor(private router: Router, 
    private registroService: RegistrosServiceService,
    private funionarioService: FuncionarioService
  ){}
  
  registro: any
  listaArquivo?: any 
  
  ngOnInit(): void {
    if(this.funionarioService.getFuncionario() != null){
      if(this.registroService.getRegistro() != null){
        this.registro = this.registroService.getRegistro()
        this.registro.dataRegistro = this.registro.dataRegistro.substring(0,10)
        this.registroService.getAllArquivos(this.registro.id).subscribe(
          (response) => {this.listaArquivo = response}
        )
      } else (this.router.navigate(['/home']))
    } else (this.router.navigate(['/']))
  }

  btCancelar(){
    this.registroService.setRegistro(null)
    this.router.navigate(['/home'])
  }

}
