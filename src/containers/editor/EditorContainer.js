import EditorView from '@/view/editor/EditorView';
import { connect } from 'react-redux';
import {
    canAddChildren,
    canAddSiblings,
    canMoveDown,
    canMoveLeft,
    canMoveRight,
    canMoveUp,
    getCurrentNode,
    getCurrentNodeParent,
    getCurrentNodeParentId,
    getOutlineTreeItemsCount
} from '@/selectors';
import {
    generateDescendantsOfNode,
    setOutlineTreeNode,
    moveDown,
    moveLeft,
    moveRight,
    moveToNode,
    moveUp,
    removeNodeWithDescendants,
    toggleEditMode,
    togglePopup,
    toggleTreeMode
} from '@/actions/index';

const stateToProps = function(state) {
    return ({
        canAddChildren: canAddChildren(state),
        canAddSiblings: canAddSiblings(state),
        canMoveDown: canMoveDown(state),
        canMoveLeft: canMoveLeft(state),
        canMoveRight: canMoveRight(state),
        canMoveUp: canMoveUp(state),
        currentNode: getCurrentNode(state),
        hasExactlyOneItemBesidesRoot: getOutlineTreeItemsCount(state) === 1,
        isEditMode: state.mode.isEditMode,
        isTreeMode: state.mode.isTreeMode,
        parentNode: getCurrentNodeParent(state),
        parentNodeId: getCurrentNodeParentId(state),
        outlineTree: state.outlineTree
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
        moveUp() {
            dispatch(moveUp());
        },
        removeNodeWithDescendants({ nodeId }) {
            dispatch(removeNodeWithDescendants({ nodeId }));
        },
        toggleEditMode({ isEditMode }) {
            dispatch(toggleEditMode({ isEditMode }));
        },
        togglePopup({ isActive, type, props }) {
            dispatch(togglePopup({
                isActivePopup: isActive,
                popupType: type,
                props
            }));
        },
        toggleTreeMode({ isTreeMode }) {
            dispatch(toggleTreeMode({ isTreeMode }));
        },
        updateCard({ nodeId, leadText, bodyText }) {
            dispatch(setOutlineTreeNode({ nodeId, leadText, bodyText }));
        }
    };
};

export default connect(stateToProps, dispatchToProps)(EditorView);