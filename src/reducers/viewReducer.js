import actionTypes from '@/actions/types';

const initialState = {
    isLayoutOverlayActive: false,
    navAsideMobile: {
        isOpen: false
    }
};

export default function viewReducer(state = initialState, { type, isLayoutOverlayActive, isOpen }) {
    switch (type) {
        case actionTypes.NAV_ASIDE_MOBILE_TOGGLE: {
            return {
                ...state,
                navAsideMobile: {
                    isOpen
                }
            };
        }
        case actionTypes.TOGGLE_LAYOUT_OVERLAY: {
            return {
                ...state,
                isLayoutOverlayActive
            };
        }
        default:
            return state;
    }
}
