import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProductCardComponent } from './category-product-card.component';

describe('CategoryProductCardComponent', () => {
  let component: CategoryProductCardComponent;
  let fixture: ComponentFixture<CategoryProductCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryProductCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
