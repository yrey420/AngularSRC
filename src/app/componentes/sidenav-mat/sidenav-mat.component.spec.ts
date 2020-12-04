import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavMatComponent } from './sidenav-mat.component';

describe('SidenavMatComponent', () => {
  let component: SidenavMatComponent;
  let fixture: ComponentFixture<SidenavMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavMatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
