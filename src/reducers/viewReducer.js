import actionTypes from '@/actions/types';

const initialState = {
    isLayoutOverlayActive: false,
    navAsideMobile: {
        isOpen: false
    },
    popup: {
        type: '',
        isActive: true
    }
};

export default function viewReducer(state = initialState, {
    type,
    isActivePopup,
    isLayoutOverlayActive,
    isOpen,
    popupType
}) {
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
        case actionTypes.TOGGLE_POPUP: {
            return {
                ...state,
                popup: {
                    ...state.popup,
                    isActive: isActivePopup,
                    type: popupType || state.popup.type
                }
            }
        }
        default:
            return state;
    }
}
