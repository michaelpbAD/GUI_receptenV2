import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientEditerComponent } from './ingredient-editer.component';

describe('IngredientEditerComponent', () => {
  let component: IngredientEditerComponent;
  let fixture: ComponentFixture<IngredientEditerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientEditerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
