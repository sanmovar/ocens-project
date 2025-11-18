import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quizes } from './quizes';

describe('Quizes', () => {
  let component: Quizes;
  let fixture: ComponentFixture<Quizes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quizes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Quizes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
