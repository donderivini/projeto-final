import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroRegistroComponent } from './cadastro-registro.component';

describe('CadastroRegistroComponent', () => {
  let component: CadastroRegistroComponent;
  let fixture: ComponentFixture<CadastroRegistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroRegistroComponent]
    });
    fixture = TestBed.createComponent(CadastroRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
