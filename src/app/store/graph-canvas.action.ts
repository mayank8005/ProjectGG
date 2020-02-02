import { Action } from '@ngrx/store';
import { Node } from '../shared/graph-canvas.model';


// defining actions strings
export const SELECT_NODE = 'SELECT_NODE';

export class SelectNode implements Action {

    public readonly type = SELECT_NODE;

    constructor(public payload: Node) {}
}

export type graphCanvasActions = SelectNode;
