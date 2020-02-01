import { Component } from '@angular/core';
import { GraphStoreService } from 'src/app/services/graph-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ GraphStoreService ]
})
export class AppComponent {
  title = 'project-gg';
}
