import { TestBed, async } from '@angular/core/testing';
import { AlgoMenuComponent } from './algo-menu.component';

describe('AlgoMenuComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlgoMenuComponent
      ],
    }).compileComponents();
  }));

  it('should create the algoMenu', () => {
    const fixture = TestBed.createComponent(AlgoMenuComponent);
    const algoMenu = fixture.debugElement.componentInstance;
    expect(algoMenu).toBeTruthy();
  });

});