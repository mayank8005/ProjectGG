import { TestBed, async } from '@angular/core/testing';
import { AlgoButtonComponent } from './algo-button.component';

describe('AlgoButtonComponent', async () => {
  let fixture = TestBed.createComponent(AlgoButtonComponent);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlgoButtonComponent
      ]
    }).compileComponents();
  }));

  it('should create the algoButton', async () => {
    const algoButton = fixture.debugElement.componentInstance;
    expect(algoButton).toBeTruthy();
  });
});