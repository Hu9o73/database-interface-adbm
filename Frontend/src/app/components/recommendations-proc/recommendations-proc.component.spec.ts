import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsProcComponent } from './recommendations-proc.component';

describe('RecommendationsProcComponent', () => {
  let component: RecommendationsProcComponent;
  let fixture: ComponentFixture<RecommendationsProcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendationsProcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendationsProcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
