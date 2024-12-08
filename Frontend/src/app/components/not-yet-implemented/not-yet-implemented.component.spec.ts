import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotYetImplementedComponent } from './not-yet-implemented.component';

describe('NotYetImplementedComponent', () => {
  let component: NotYetImplementedComponent;
  let fixture: ComponentFixture<NotYetImplementedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotYetImplementedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotYetImplementedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
