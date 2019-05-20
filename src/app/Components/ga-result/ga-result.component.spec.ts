import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaResultComponent } from './ga-result.component';

describe('GaResultComponent', () => {
  let component: GaResultComponent;
  let fixture: ComponentFixture<GaResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
