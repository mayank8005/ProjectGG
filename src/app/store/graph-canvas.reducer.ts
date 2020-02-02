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
        default: {
            return state;
        }
    }
}
