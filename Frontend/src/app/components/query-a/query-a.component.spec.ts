import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryAComponent } from './query-a.component';

describe('QueryAComponent', () => {
  let component: QueryAComponent;
  let fixture: ComponentFixture<QueryAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
