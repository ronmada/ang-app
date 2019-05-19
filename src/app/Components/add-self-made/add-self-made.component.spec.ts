import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSelfMadeComponent } from './add-self-made.component';

describe('AddSelfMadeComponent', () => {
  let component: AddSelfMadeComponent;
  let fixture: ComponentFixture<AddSelfMadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSelfMadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSelfMadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
