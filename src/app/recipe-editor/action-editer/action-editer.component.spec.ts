import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionEditerComponent } from './action-editer.component';

describe('ActionEditerComponent', () => {
  let component: ActionEditerComponent;
  let fixture: ComponentFixture<ActionEditerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionEditerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
