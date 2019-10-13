import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAverageComponent } from './chart-average.component';

describe('ChartAverageComponent', () => {
  let component: ChartAverageComponent;
  let fixture: ComponentFixture<ChartAverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartAverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
