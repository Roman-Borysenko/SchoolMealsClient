import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductButtonsComponent } from './product-buttons.component';

describe('ProductButtonsComponent', () => {
  let component: ProductButtonsComponent;
  let fixture: ComponentFixture<ProductButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
