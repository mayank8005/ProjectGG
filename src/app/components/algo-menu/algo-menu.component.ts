import {
    Component
} from '@angular/core';

import CONSTANT from '../../../lib/CONSTANTS';
import Algorithms from '../../../lib/Algorithms';

@Component({
    selector: 'app-algo-menu',
    templateUrl: 'algo-menu.component.html',
    styleUrls: ['algo-menu.component.css']
})
export class AlgoMenuComponent {
    headerText = CONSTANT['application.algoMenuHeading'];
    algorithms = Algorithms;
}
