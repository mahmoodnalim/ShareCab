import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviesComponent } from './overvies.component';

describe('OverviesComponent', () => {
  let component: OverviesComponent;
  let fixture: ComponentFixture<OverviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
