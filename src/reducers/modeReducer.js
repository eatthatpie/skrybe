import actionTypes from '@/actions/types';

const initialState = {
    isTreeMode: false
};

export default function modeReducer(state = initialState, { type, isTreeMode }) {
    switch (type) {
        case actionTypes.TOGGLE_TREE_MODE: {
            return {
                ...state,
                isTreeMode
            };
        }
        default:
            return state;
    }
}
