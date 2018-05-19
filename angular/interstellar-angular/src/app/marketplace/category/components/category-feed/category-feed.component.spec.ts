import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryFeedComponent } from './category-feed.component';


describe('ProductfeedComponent', () => {
  let component: CategoryFeedComponent;
  let fixture: ComponentFixture<CategoryFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
