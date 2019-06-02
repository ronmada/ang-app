import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadScreenComponent } from '../Components/load-screen/load-screen.component';

describe('LoadScreenComponent', () => {
  let component: LoadScreenComponent;
  let fixture: ComponentFixture<LoadScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
