import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSubjectComponent } from './register-subject.component';

describe('RegisterSubjectComponent', () => {
  let component: RegisterSubjectComponent;
  let fixture: ComponentFixture<RegisterSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
