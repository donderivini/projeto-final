import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFuncionarioInternoComponent } from './update-funcionario-interno.component';

describe('UpdateFuncionarioInternoComponent', () => {
  let component: UpdateFuncionarioInternoComponent;
  let fixture: ComponentFixture<UpdateFuncionarioInternoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateFuncionarioInternoComponent]
    });
    fixture = TestBed.createComponent(UpdateFuncionarioInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
