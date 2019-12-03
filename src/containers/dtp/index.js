import {
    togglePopup,
    moveDown,
    moveLeft,
    moveRight,
    moveUp,
    toggleTreeMode
} from '@/actions';

export function caseMoveUpDownLeftRightDTP(dispatch) {
    return {
        moveDown() {
            dispatch(moveDown());
        },
        moveLeft() {
            dispatch(moveLeft());
        },
        moveRight() {
            dispatch(moveRight());
        },
        moveUp() {
            dispatch(moveUp());
        }
    };
}

export function caseTogglePopupDTP(dispatch) {
    return {
        togglePopup({ isActive, type, props }) {
            dispatch(togglePopup({
                isActivePopup: isActive,
                popupType: type,
                props
            }));
        }
    };
}

export function caseToggleTreeModeDTP(dispatch) {
    return {
        toggleTreeMode({ isTreeMode }) {
            dispatch(toggleTreeMode({ isTreeMode }));
        }
    };
}
