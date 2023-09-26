import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroFuncionarioInternoComponent } from './cadastro-funcionario-interno.component';

describe('CadastroFuncionarioInternoComponent', () => {
  let component: CadastroFuncionarioInternoComponent;
  let fixture: ComponentFixture<CadastroFuncionarioInternoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroFuncionarioInternoComponent]
    });
    fixture = TestBed.createComponent(CadastroFuncionarioInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
