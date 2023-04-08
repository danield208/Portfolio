import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataprotectComponent } from './dataprotect.component';

describe('DataprotectComponent', () => {
  let component: DataprotectComponent;
  let fixture: ComponentFixture<DataprotectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataprotectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataprotectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
