import { Subject, Observable } from 'rxjs';

class AlgoController {

    private static controller = new Subject<string>();

    public static getAlgoControlReciever(): Observable<string> {
        return AlgoController.controller;
    }

    // This will trigger controller observable to send algoId string to all subscribers
    public static triggerAlgoControl(algoId: string): void {
        AlgoController.controller.next(algoId);
    }

}

export default AlgoController;
