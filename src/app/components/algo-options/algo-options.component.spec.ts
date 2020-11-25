import { TestBed, async } from '@angular/core/testing';
import { AlgoOptionsComponent } from './algo-options.component';

describe('AlgoOptionsComponent', async () => {
  let fixture = TestBed.createComponent(AlgoOptionsComponent);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlgoOptionsComponent
      ]
    }).compileComponents();
  }));

  it('should create the algoButton', async () => {
    const algoOptions = fixture.debugElement.componentInstance;
    expect(algoOptions).toBeTruthy();
  });
});