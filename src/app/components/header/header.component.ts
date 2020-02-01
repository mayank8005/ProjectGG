import { Component } from '@angular/core';
import CONSTANTS from '../../../lib/CONSTANTS';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent {
    headingText: string = CONSTANTS['application.heading'];
}
