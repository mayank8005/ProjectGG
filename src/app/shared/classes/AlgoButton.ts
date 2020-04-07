import { Subject, Observable } from 'rxjs';

import Button from './Button';

class AlgoButton extends Button {

    private static controller = new Subject<string>();

    constructor(label: string, private algorithmId: string) {
        super(label);
    }

    static getControlReceiver(): Observable<string> {
        return AlgoButton.controller;
    }

    onClickHandler() {
        AlgoButton.controller.next(this.algorithmId);
    }
}

export default AlgoButton;
