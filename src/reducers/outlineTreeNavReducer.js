import actionTypes from '@/actions/types';

const initialState = {
    currentNodeId: 'root'
};

export default function outlineTreeNavReducer(state = initialState, { type, currentNodeId }) {
    switch (type) {
        case actionTypes.SET_OUTLINE_TREE_CURRENT_NODE:
            return {
                currentNodeId
            };
        default:
            return state;
    }
};