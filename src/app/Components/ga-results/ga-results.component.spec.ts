import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaResultsComponent } from './ga-results.component';

describe('GaResultsComponent', () => {
  let component: GaResultsComponent;
  let fixture: ComponentFixture<GaResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
