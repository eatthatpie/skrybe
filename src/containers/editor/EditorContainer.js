import EditorView from '@/view/editor/EditorView';
import { connect } from 'react-redux';
import {
    getCurrentNode,
    getCurrentNodeParent,
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
    moveToNode,
    removeNodeWithDescendants,
    toggleEditMode,
    togglePopup,
    toggleTreeMode
} from '@/actions/index';

const stateToProps = function(state) {
    return ({
        currentNode: getCurrentNode(state),
        parentNodeId: getCurrentNodeParentId(state),
        parentNode: getCurrentNodeParent(state),
        isEditMode: state.mode.isEditMode,
        isTreeMode: state.mode.isTreeMode,
        outlineTree: state.outlineTree,
        canMoveUp: canMoveUp(state),
        canMoveDown: canMoveDown(state),
        canMoveLeft: canMoveLeft(state),
        canMoveRight: canMoveRight(state)
    });
};

const dispatchToProps = function(dispatch) {
    return {
        generateDescendants({ nodeId }) {
            dispatch(generateDescendantsOfNode({
                nodeId,
                shouldMoveAfter: true
            }));
        },
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
        moveToNode({ nodeId }) {
            dispatch(moveToNode({ nodeId }));
        },
        removeNodeWithDescendants({ nodeId }) {
            dispatch(removeNodeWithDescendants({ nodeId }));
        },
        toggleTreeMode({ isTreeMode }) {
            dispatch(toggleTreeMode({ isTreeMode }));
        },
        togglePopup({ isActive, type, props }) {
            dispatch(togglePopup({ isActivePopup: isActive, popupType: type, props }));
        },
        toggleEditMode({ isEditMode }) {
            dispatch(toggleEditMode({ isEditMode }));
        }
    };
};

export default connect(stateToProps, dispatchToProps)(EditorView);