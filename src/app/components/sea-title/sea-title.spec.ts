import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaTitle } from './sea-title';

describe('SeaTitle', () => {
  let component: SeaTitle;
  let fixture: ComponentFixture<SeaTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeaTitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeaTitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
