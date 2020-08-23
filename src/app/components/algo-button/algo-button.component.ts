import { Component, Input } from '@angular/core';
import AlgoController from '../../shared/classes/AlgoController';

@Component({
    selector: 'app-algo-button',
    templateUrl: 'algo-button.component.html',
    styleUrls: ['algo-button.component.css']
})
export class AlgoButtonComponent {

    @Input() algoId: string;
    @Input() label: string;

    onClickHandler(): void {
        AlgoController.triggerAlgoControl(this.algoId);
    }

}
