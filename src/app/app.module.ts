import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent, GraphCanvasComponent, AlgoMenuComponent, AlgoButtonComponent, AlgoOptionsComponent } from './components';
import { graphCanvasReducer } from './store/graph-canvas.reducer';
import { HyphenPipe } from './pipes/hyphen';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GraphCanvasComponent,
    AlgoMenuComponent,
    HyphenPipe,
    AlgoButtonComponent,
    AlgoOptionsComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({graphCanvas: graphCanvasReducer}),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
