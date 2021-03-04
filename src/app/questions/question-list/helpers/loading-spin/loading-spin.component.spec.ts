import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinComponent } from './loading-spin.component';

describe('LoadingSpinComponent', () => {
  let component: LoadingSpinComponent;
  let fixture: ComponentFixture<LoadingSpinComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingSpinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
