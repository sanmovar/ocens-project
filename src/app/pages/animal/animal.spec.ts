import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Animal } from './animal';

describe('Animal', () => {
  let component: Animal;
  let fixture: ComponentFixture<Animal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Animal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Animal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
