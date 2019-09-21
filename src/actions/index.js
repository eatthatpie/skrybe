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

export const moveToNode = function({ nodeId }) {
    return { type: actionTypes.MOVE_TO_NODE, nodeId };
};

export const navAsideMobileToggle = function({ isOpen }) {
    return { type: actionTypes.NAV_ASIDE_MOBILE_TOGGLE, isOpen };
};

export const navToggle = function({ name }) {
    return { type: actionTypes.NAV_TOGGLE, name };
};

export const removeNodeWithDescendants = function({ nodeId }) {
    return { type: actionTypes.REMOVE_NODE_WITH_DESCENDANTS, nodeId };
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

export const toggleLayoutOverlay = function({ isLayoutOverlayActive }) {
    return {
        type: actionTypes.TOGGLE_LAYOUT_OVERLAY,
        isLayoutOverlayActive
    }
}

export const togglePopup = function({ isActivePopup, popupType, props }) {
    return {
        type: actionTypes.TOGGLE_POPUP,
        isActivePopup,
        popupType,
        props
    }
}

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
