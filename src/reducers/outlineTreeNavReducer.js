import actionTypes from '@/actions/types';

const initialState = {
    currentNodeId: '7'
};

export default function outlineTreeReducer(state = initialState, { type, currentNodeId }) {
    switch (type) {
        case actionTypes.SET_OUTLINE_TREE_CURRENT_NODE:
            return {
                ...state,
                currentNodeId
            };
        default:
            return state;
    }
};