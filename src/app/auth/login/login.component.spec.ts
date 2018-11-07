import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../auth.service';
import { By } from '@angular/platform-browser';
import {BackendService} from '../../backend.service';
import {RouterTestingModule} from '@angular/router/testing';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService;
  let backendService;

  class MockBackendService {
    editId = 0;
    saved = true;
  }

    beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: BackendService, useValue: MockBackendService},
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    authService = fixture.debugElement.injector.get(AuthService);
    backendService = fixture.debugElement.injector.get(BackendService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login successfull ==> invalidLogin === false', async(() => {
    // omdat je met een reactive form werkt, wordt de form variabele aangemaakt in de ngOnInit van je component
    // => oproepen voor je iets anders doet
    component.ngOnInit();
    const loginSpy = spyOn(authService, 'login').and.returnValue(Promise.resolve(true));
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.onLogin();
    fixture.whenStable().then(() => {
      expect(component.invalidLogin).toBe(false);
    });
  }));

  it('login unsuccessfull ==> invalidLogin === true', async(() => {
    component.ngOnInit();
    const loginSpy = spyOn(authService, 'login').and.returnValue(Promise.resolve(false));
    component.onLogin();
    fixture.whenStable().then(() => {
      expect(component.invalidLogin).toBe(true);
    });
  }));

  it('login successfull ==> NOT Contain <div>Invalid email and/or password.</div>', fakeAsync(() => {
    component.ngOnInit();
    const loginSpy = spyOn(authService, 'login').and.returnValue(Promise.resolve(true));
    fixture.detectChanges();
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.onLogin();
    tick();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').textContent).not.toContain('Invalid email and/or password.');
  }));

  it('login unsuccessfull ==> <div>Invalid email and/or password.</div>', fakeAsync(() => {
    component.ngOnInit();
    const loginSpy = spyOn(authService, 'login').and.returnValue(Promise.resolve(false));
    fixture.detectChanges();          // nodig om de databinding tussen typescript en HTML te doen (onInit)
    component.onLogin();
    tick();                           // beëindigd alle asynchrone taken (kan hier want delay in promise is 0)
    fixture.detectChanges();          // na beëindigen van asynchrone onLogin nog eens databinding doen
    const compiled = fixture.debugElement.nativeElement;    // template renderen
    expect(compiled.querySelector('div').textContent).toContain('Invalid email and/or password.');
  }));

  it('login successfull (form submit) ==> NOT Contain(<div>Invalid email and/or password.</div>)', async(() => {
    component.ngOnInit();
    const loginSpy = spyOn(authService, 'login').and.returnValue(Promise.resolve(true));
    fixture.detectChanges();
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);            // submit form
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('div').textContent).not.toContain('Invalid email and/or password.');
    });
  }));

  it('login unsuccessfull (form submit) ==> Contain(<div>Invalid email and/or password.</div>)', async(() => {
    component.ngOnInit();
    const loginSpy = spyOn(authService, 'login').and.returnValue(Promise.resolve(false));
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);            // submit form
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('div').textContent).toContain('Invalid email and/or password.');
    });
  }));

  it('login successfull && saved = true ==> router = /recipe/list', async(() => {
    component.ngOnInit();
    const loginSpy = spyOn(authService, 'login').and.returnValue(Promise.resolve(true));
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.onLogin();
    fixture.whenStable().then(() => {
      expect(component.invalidLogin).toBe(false);
      // nakijken of de argumenten kloppen
      expect(navigateSpy).toHaveBeenCalledWith(['recipe', 'list']);
    });
  }));

  it('login successfull && saved = false ==> router = /recipe/id/edit', async(() => {

    const id = 0;
    backendService.saved = false;
    backendService.editId = id;

    component.ngOnInit();

    const loginSpy = spyOn(authService, 'login').and.returnValue(Promise.resolve(true));
    const navigateSpy = spyOn((<any>component).router, 'navigate');

    component.onLogin();

    fixture.whenStable().then(() => {
      expect(component.invalidLogin).toBe(false);
      expect(navigateSpy).toHaveBeenCalledWith(['recipe', id, 'edit']);
    });
  }));
});
