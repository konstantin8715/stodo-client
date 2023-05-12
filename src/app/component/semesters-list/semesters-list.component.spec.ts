import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemestersListComponent } from './semesters-list.component';

describe('SemestersListComponent', () => {
  let component: SemestersListComponent;
  let fixture: ComponentFixture<SemestersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemestersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemestersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
