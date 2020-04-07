import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent, GraphCanvasComponent, AlgoMenuComponent } from './components';
import { graphCanvasReducer } from './store/graph-canvas.reducer';
import { HyphenPipe } from './pipes/hyphen';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GraphCanvasComponent,
    AlgoMenuComponent,
    HyphenPipe
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({graphCanvas: graphCanvasReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
