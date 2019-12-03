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
    moveToNode,
    removeNodeWithDescendants,
    toggleEditMode
} from '@/actions';
import { objectMerge } from '@/helpers';
import {
    caseMoveUpDownLeftRightDTP,
    caseTogglePopupDTP,
    caseToggleTreeModeDTP
} from '@/containers/dtp';

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
    return objectMerge(
        caseTogglePopupDTP(dispatch),
        caseMoveUpDownLeftRightDTP(dispatch),
        caseToggleTreeModeDTP(dispatch),
        {
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
            moveToNode({ nodeId }) {
                dispatch(moveToNode({ nodeId }));
            },
            removeNodeWithDescendants({ nodeId }) {
                dispatch(removeNodeWithDescendants({ nodeId }));
            },
            toggleEditMode({ isEditMode }) {
                dispatch(toggleEditMode({ isEditMode }));
            },
            toggleTreeMode({ isTreeMode }) {
                dispatch(toggleTreeMode({ isTreeMode }));
            },
            updateCard({ nodeId, leadText, bodyText }) {
                dispatch(setOutlineTreeNode({ nodeId, leadText, bodyText }));
            }
        }
    );
};

export default connect(stateToProps, dispatchToProps)(EditorView);
