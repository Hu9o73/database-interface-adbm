import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryEComponent } from './query-e.component';

describe('QueryEComponent', () => {
  let component: QueryEComponent;
  let fixture: ComponentFixture<QueryEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryEComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
