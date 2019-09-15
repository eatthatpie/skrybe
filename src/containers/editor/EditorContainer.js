import EditorView from '@/view/editor/EditorView';
import { connect } from 'react-redux';
import {
    getCurrentNode,
    getCurrentNodeParentId,
    canMoveUp,
    canMoveDown,
    canMoveLeft,
    canMoveRight
} from '@/selectors';
import {
    generateDescendantsOfNode,
    setOutlineTreeNode,
    updateCharacters,
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
    toggleEditMode,
    toggleTreeMode
} from '@/actions/index';

const stateToProps = function(state) {
    return ({
        currentNode: getCurrentNode(state),
        isEditMode: state.mode.isEditMode,
        isTreeMode: state.mode.isTreeMode,
        parentNodeId: getCurrentNodeParentId(state),
        outlineTree: state.outlineTree,
        canMoveUp: canMoveUp(state),
        canMoveDown: canMoveDown(state),
        canMoveLeft: canMoveLeft(state),
        canMoveRight: canMoveRight(state)
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
        updateCharacters({ nodeId, characterNames }) {
            dispatch(updateCharacters({ nodeId, characterNames }));
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
        },
        toggleTreeMode({ isTreeMode }) {
            dispatch(toggleTreeMode({ isTreeMode }));
        },
        toggleEditMode({ isEditMode }) {
            dispatch(toggleEditMode({ isEditMode }));
        }
    };
};

export default connect(stateToProps, dispatchToProps)(EditorView);