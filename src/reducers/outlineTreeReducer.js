import actionTypes from '@/actions/types';
import caseGenerateOTNodeDescendantsReducer from './caseGenerateOTNodeDescendantsReducer'
import caseMoveDownOTNodeReducer from './caseMoveDownOTNodeReducer';
import caseMoveLeftOTNodeReducer from './caseMoveLeftOTNodeReducer';
import caseMoveRightOTNodeReducer from './caseMoveRightOTNodeReducer';
import caseMoveToOTNodeReducer from './caseMoveToOTNodeReducer';
import caseMoveUpOTNodeReducer from './caseMoveUpOTNodeReducer';
import caseRemoveOTNodeCascReducer from './caseRemoveOTNodeCascReducer';
import caseResetOTReducer from './caseResetOTReducer';
import caseSetOTNodeReducer from './caseSetOTNodeReducer';

const initialState = {
    lastId: 0,
    currentNodeId: 'root',
    items: {
        root: {
            leadText: 'Write down the one line description of your story.',
            bodyText: '',
            parentNodeId: null,
            descendants: [],
            siblings: []
        }
    }
};

export default function outlineTreeReducer(state = initialState, {
    bodyText,
    dangerousOutlineTree,
    leadText,
    nodeId,
    parentNodeId,
    shouldMoveAfter,
    type
}) {
    switch (type) {
        case actionTypes.MOVE_TO_NODE:
            return caseMoveToOTNodeReducer(state, { nodeId });
        case actionTypes.DANGEROUSLY_RESET_OUTLINE_TREE:
            return caseResetOTReducer(state, { dangerousOutlineTree });
        case actionTypes.SET_OUTLINE_TREE_NODE:
            return caseSetOTNodeReducer(state, {
                nodeId,
                parentNodeId,
                leadText,
                bodyText,
                shouldMoveAfter
            });
        case actionTypes.GENERATE_DESCENDANTS_OF_NODE:
            return caseGenerateOTNodeDescendantsReducer(state, {
                nodeId,
                shouldMoveAfter
            });
        case actionTypes.MOVE_UP:
            return caseMoveUpOTNodeReducer(state);
        case actionTypes.MOVE_DOWN:
            return caseMoveDownOTNodeReducer(state);
        case actionTypes.MOVE_LEFT:
            return caseMoveLeftOTNodeReducer(state);
        case actionTypes.MOVE_RIGHT:
            return caseMoveRightOTNodeReducer(state);
        case actionTypes.REMOVE_NODE_WITH_DESCENDANTS:
            return caseRemoveOTNodeCascReducer(state, { nodeId });
        default:
            return state;
    }
};
