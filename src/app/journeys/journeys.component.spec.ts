/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JourneysComponent } from './journeys.component';

describe('JourneysComponent', () => {
  let component: JourneysComponent;
  let fixture: ComponentFixture<JourneysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
