import { Action } from '@ngrx/store';
import { Node } from '../shared/models/GraphUtil.model';


// defining actions strings
export const SELECT_NODE = 'SELECT_NODE';
export const CLEAR_NODE_SELECTION = 'CLEAR_NODE_SELECTION';

export class SelectNode implements Action {

    public readonly type = SELECT_NODE;

    constructor(public payload: Node) {}
}

export class ClearNodeSelection implements Action {

    public readonly type = CLEAR_NODE_SELECTION;
}

export type graphCanvasActions = SelectNode | ClearNodeSelection;
