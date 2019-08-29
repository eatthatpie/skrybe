import actionTypes from './types';

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

export const updateCharacters = function({ nodeId, characterNames }) {
    return {
        type: actionTypes.UPDATE_CHARACTERS,
        nodeId,
        characterNames
    };
};