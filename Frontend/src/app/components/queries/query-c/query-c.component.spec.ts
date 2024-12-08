import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryCComponent } from './query-c.component';

describe('QueryCComponent', () => {
  let component: QueryCComponent;
  let fixture: ComponentFixture<QueryCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
