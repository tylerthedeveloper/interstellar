import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsHomePageComponent } from './products-home-page.component';

describe('ProductsHomePageComponent', () => {
  let component: ProductsHomePageComponent;
  let fixture: ComponentFixture<ProductsHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
