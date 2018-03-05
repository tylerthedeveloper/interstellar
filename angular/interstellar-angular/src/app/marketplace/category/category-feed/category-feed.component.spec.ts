import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFeedComponent } from './product-feed.component';

describe('ProductfeedComponent', () => {
  let component: ProductFeedComponent;
  let fixture: ComponentFixture<ProductFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
