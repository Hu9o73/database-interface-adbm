import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryBComponent } from './query-b.component';

describe('QueryBComponent', () => {
  let component: QueryBComponent;
  let fixture: ComponentFixture<QueryBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
