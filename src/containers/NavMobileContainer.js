import NavMobile from '@/view/nav/NavMobile';
import { connect } from 'react-redux';
import {
    canMoveUp,
    canMoveDown,
    canMoveLeft,
    canMoveRight
} from '@/selectors';
import { navAsideMobileToggle } from '@/actions';
import { objectMerge } from '@/helpers';
import {
    caseMoveUpDownLeftRightDTP,
    caseToggleTreeModeDTP
} from '@/containers/dtp';

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
    return objectMerge(
        caseMoveUpDownLeftRightDTP(dispatch),
        caseToggleTreeModeDTP(dispatch),
        {
            openNavAsideMobile() {
                dispatch(navAsideMobileToggle({ isOpen: true }));
            }
        }
    );
};

export default connect(stateToProps, dispatchToProps)(NavMobile);
