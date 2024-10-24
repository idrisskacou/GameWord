import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchDetailComponentComponent } from './launch-detail-component.component';

describe('LaunchDetailComponentComponent', () => {
  let component: LaunchDetailComponentComponent;
  let fixture: ComponentFixture<LaunchDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaunchDetailComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaunchDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
