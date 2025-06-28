import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerComponent, NoopAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle drawer state', () => {
    expect(component.opened).toBeFalsy();
    
    component.toggleDrawer();
    expect(component.opened).toBeTruthy();
    
    component.toggleDrawer();
    expect(component.opened).toBeFalsy();
  });

  it('should close drawer', () => {
    component.opened = true;
    component.closeDrawer();
    expect(component.opened).toBeFalsy();
  });
});
