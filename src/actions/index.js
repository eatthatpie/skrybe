import actionTypes from './types';

export const dangerouslyResetOutlineTree = function(outlineTree) {
    return {
        type: actionTypes.DANGEROUSLY_RESET_OUTLINE_TREE,
        dangerousOutlineTree: outlineTree,
    }
}

export const generateDescendantsOfNode = function({
    nodeId,
    shouldMoveAfter
}) {
    return {
        type: actionTypes.GENERATE_DESCENDANTS_OF_NODE,
        nodeId,
        shouldMoveAfter
    };
};

export const moveUp = function() {
    return { type: actionTypes.MOVE_UP };
};

export const moveDown = function() {
    return { type: actionTypes.MOVE_DOWN };
};

export const moveLeft = function() {
    return { type: actionTypes.MOVE_LEFT };
};

export const moveRight = function() {
    return { type: actionTypes.MOVE_RIGHT };
};

export const navAsideMobileToggle = function({ isOpen }) {
    return { type: actionTypes.NAV_ASIDE_MOBILE_TOGGLE, isOpen }
}

export const navToggle = function({ name }) {
    return { type: actionTypes.NAV_TOGGLE, name };
};

export const setOutlineTreeNode = function({
    nodeId,
    parentNodeId,
    leadText,
    bodyText,
    shouldMoveAfter
}) {
    return {
        type: actionTypes.SET_OUTLINE_TREE_NODE,
        nodeId,
        parentNodeId,
        leadText,
        bodyText,
        shouldMoveAfter
    };
};

export const setOutlineTreeCurrentNode = function({ currentNodeId }) {
    return {
        type: actionTypes.SET_OUTLINE_TREE_CURRENT_NODE,
        currentNodeId
    };
};

export const toggleEditMode = function({ isEditMode }) {
    return {
        type: actionTypes.TOGGLE_EDIT_MODE,
        isEditMode
    };
};

export const toggleTreeMode = function({ isTreeMode }) {
    return {
        type: actionTypes.TOGGLE_TREE_MODE,
        isTreeMode
    };
};

export const updateCharacters = function({ nodeId, characterNames }) {
    return {
        type: actionTypes.UPDATE_CHARACTERS,
        nodeId,
        characterNames
    };
};
