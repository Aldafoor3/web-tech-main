import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutioncountstatsComponent } from './solutioncountstats.component';

describe('SolutioncountstatsComponent', () => {
  let component: SolutioncountstatsComponent;
  let fixture: ComponentFixture<SolutioncountstatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolutioncountstatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutioncountstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
