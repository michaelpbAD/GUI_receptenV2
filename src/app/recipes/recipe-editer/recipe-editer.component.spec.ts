import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEditerComponent } from './recipe-editer.component';

describe('RecipeEditerComponent', () => {
  let component: RecipeEditerComponent;
  let fixture: ComponentFixture<RecipeEditerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeEditerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
