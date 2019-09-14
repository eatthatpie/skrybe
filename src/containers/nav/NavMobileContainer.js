import NavMobile from '@/view/nav/NavMobile';
import { connect } from 'react-redux';
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
