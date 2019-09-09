import actionTypes from '@/actions/types';

const initialState = {
    navAsideMobile: {
        isOpen: false
    }
};

export default function viewReducer(state = initialState, { type, isOpen }) {
    switch (type) {
        case actionTypes.NAV_ASIDE_MOBILE_TOGGLE: {
            return {
                ...state,
                navAsideMobile: {
                    isOpen
                }
            };
        }
        default:
            return state;
    }
}
