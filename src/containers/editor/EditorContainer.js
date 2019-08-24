import EditorView from '@/view/editor/EditorView';
import { connect } from 'react-redux';
import { getCurrentNode, getCurrentNodeParentId } from '@/selectors/index';
import {
    generateDescendantsOfNode,
    setOutlineTreeNode,
    moveUp,
    moveDown,
    moveLeft,
    moveRight
} from '@/actions/index';

const stateToProps = function(state) {
    return ({
        currentNode: getCurrentNode(state),
        parentNodeId: getCurrentNodeParentId(state),
        outlineTree: state.outlineTree
    });
};

const dispatchToProps = function(dispatch) {
    return {
        insertCard({ parentNodeId, leadText, bodyText }) {
            dispatch(setOutlineTreeNode({
                parentNodeId,
                leadText,
                bodyText,
                shouldMoveAfter: true
            }));
        },
        updateCard({ nodeId, leadText, bodyText }) {
            dispatch(setOutlineTreeNode({ nodeId, leadText, bodyText }));
            dispatch(generateDescendantsOfNode({
                nodeId,
                shouldMoveAfter: true
            }));
        },
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
        }
    };
};

export default connect(stateToProps, dispatchToProps)(EditorView);