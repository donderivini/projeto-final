import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroFrotaComponent } from './cadastro-frota.component';

describe('CadastroFrotaComponent', () => {
  let component: CadastroFrotaComponent;
  let fixture: ComponentFixture<CadastroFrotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroFrotaComponent]
    });
    fixture = TestBed.createComponent(CadastroFrotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
