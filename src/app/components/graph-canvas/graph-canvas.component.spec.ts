import { TestBed, async } from '@angular/core/testing';
import { GraphCanvasComponent } from './graph-canvas.component';
import { GraphStoreService } from 'src/app/services/graph-store.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HyphenPipe } from '../../pipes/hyphen';

describe('GraphCanvasComponent', () => {
  let store: MockStore;
  const initialState = { graphCanvas: { selectedNode: null } };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GraphCanvasComponent,
        HyphenPipe
      ],
      providers: [GraphStoreService, provideMockStore({ initialState }),
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  it('should create the graphCanvasComponent', () => {
    const fixture = TestBed.createComponent(GraphCanvasComponent);
    const graphCanvasComp = fixture.debugElement.componentInstance;
    expect(graphCanvasComp).toBeTruthy();
  });

});
