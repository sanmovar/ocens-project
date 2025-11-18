import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seas } from './seas';

describe('Seas', () => {
  let component: Seas;
  let fixture: ComponentFixture<Seas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Seas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Seas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
