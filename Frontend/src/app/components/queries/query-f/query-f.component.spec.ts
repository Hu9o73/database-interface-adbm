import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryFComponent } from './query-f.component';

describe('QueryFComponent', () => {
  let component: QueryFComponent;
  let fixture: ComponentFixture<QueryFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryFComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
