import CardsGridView from '@/view/card/CardsGridView';
import { connect } from 'react-redux';
import {
    canMoveDown,
    canMoveLeft,
    canMoveRight,
    canMoveUp,
    getCurrentNodeId,
    getCurrentNodeParent,
    getCurrentNodeParentId
} from '@/selectors';
import {
    moveDown,
    moveLeft,
    moveRight,
    moveUp,
} from '@/actions/index';

const stateToProps = function(state) {
    return ({
        canMoveDown: canMoveDown(state),
        canMoveLeft: canMoveLeft(state),
        canMoveRight: canMoveRight(state),
        canMoveUp: canMoveUp(state),
        currentNodeId: getCurrentNodeId(state),
        parentNode: getCurrentNodeParent(state),
        parentNodeId: getCurrentNodeParentId(state)
    });
}

const dispatchToProps = function(dispatch) {
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
    }
}

export default connect(stateToProps, dispatchToProps)(CardsGridView);
