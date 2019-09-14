import actionTypes from '@/actions/types';

const initialState = {
    isTreeMode: false,
    isEditMode: false
};

export default function modeReducer(state = initialState, { type, isEditMode, isTreeMode }) {
    switch (type) {
        case actionTypes.TOGGLE_TREE_MODE: {
            return {
                ...state,
                isTreeMode
            };
        }
        case actionTypes.TOGGLE_EDIT_MODE: {
            return {
                ...state,
                isEditMode
            };
        }
        default:
            return state;
    }
}
