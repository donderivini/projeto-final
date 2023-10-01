import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFrotaComponent } from './update-frota.component';

describe('UpdateFrotaComponent', () => {
  let component: UpdateFrotaComponent;
  let fixture: ComponentFixture<UpdateFrotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateFrotaComponent]
    });
    fixture = TestBed.createComponent(UpdateFrotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
