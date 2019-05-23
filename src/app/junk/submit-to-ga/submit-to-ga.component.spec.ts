import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitToGAComponent } from './submit-to-ga.component';

describe('SubmitToGAComponent', () => {
  let component: SubmitToGAComponent;
  let fixture: ComponentFixture<SubmitToGAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitToGAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitToGAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
