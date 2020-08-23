import * as graphCanvasActions from '../store/graph-canvas.action';

// initial state
const initialState = {
    selectedNode: null
};


export function graphCanvasReducer(state= initialState, action: graphCanvasActions.graphCanvasActions) {

    switch (action.type) {

        case graphCanvasActions.SELECT_NODE: {
            return {
                ...state,
                selectedNode: action.payload
            };
        }
        case graphCanvasActions.CLEAR_NODE_SELECTION: {
            return {
                ...state,
                selectedNode: null
            };
        }
        default: {
            return state;
        }
    }
}
