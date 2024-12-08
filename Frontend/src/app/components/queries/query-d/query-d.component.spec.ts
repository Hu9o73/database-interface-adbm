import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryDComponent } from './query-d.component';

describe('QueryDComponent', () => {
  let component: QueryDComponent;
  let fixture: ComponentFixture<QueryDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
