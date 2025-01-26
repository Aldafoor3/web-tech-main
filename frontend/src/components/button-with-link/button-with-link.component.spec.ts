import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWithLinkComponent } from './button-with-link.component';

describe('ButtonWithLinkComponent', () => {
  let component: ButtonWithLinkComponent;
  let fixture: ComponentFixture<ButtonWithLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonWithLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonWithLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
