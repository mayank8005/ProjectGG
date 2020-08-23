import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent, GraphCanvasComponent, AlgoMenuComponent, AlgoButtonComponent } from './components';
import { graphCanvasReducer } from './store/graph-canvas.reducer';
import { HyphenPipe } from './pipes/hyphen';
=======

import { AppComponent } from './app.component';
import { HeaderComponent, GraphCanvasComponent } from './components';
>>>>>>> 7f93d9987959aba69164e5b4a4bf20653db138c8

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
<<<<<<< HEAD
    GraphCanvasComponent,
    AlgoMenuComponent,
    HyphenPipe,
    AlgoButtonComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({graphCanvas: graphCanvasReducer})
=======
    GraphCanvasComponent
  ],
  imports: [
    BrowserModule
>>>>>>> 7f93d9987959aba69164e5b4a4bf20653db138c8
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
