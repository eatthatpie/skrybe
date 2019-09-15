import NavMobile from '@/view/nav/NavMobile';
import { connect } from 'react-redux';
import {
    canMoveUp,
    canMoveDown,
    canMoveLeft,
    canMoveRight
} from '@/selectors';
import {
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
    navAsideMobileToggle
} from '@/actions';

const stateToProps = function(state) {
    return ({
        isEditMode: state.mode.isEditMode,
        isTreeMode: state.mode.isTreeMode,
        canMoveUp: canMoveUp(state),
        canMoveDown: canMoveDown(state),
        canMoveLeft: canMoveLeft(state),
        canMoveRight: canMoveRight(state)
    });
};

const dispatchToProps = function(dispatch) {
    return {
        moveUp() {
            dispatch(moveUp());
        },
        moveDown() {
            dispatch(moveDown());
        },
        moveLeft() {
            dispatch(moveLeft());
        },
        moveRight() {
            dispatch(moveRight());
        },
        openNavAsideMobile() {
            dispatch(navAsideMobileToggle({ isOpen: true }));
        }
    };
};

export default connect(stateToProps, dispatchToProps)(NavMobile);
