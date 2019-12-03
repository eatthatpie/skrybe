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
import { caseMoveUpDownLeftRightDTP } from '@/containers/dtp';

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

const dispatchToProps = caseMoveUpDownLeftRightDTP;

export default connect(stateToProps, dispatchToProps)(CardsGridView);
