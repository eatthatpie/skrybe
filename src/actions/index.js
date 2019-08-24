import actionTypes from './types';

export const generateDescendantsOfNode = function({ nodeId }) {
    return { type: actionTypes.GENERATE_DESCENDANTS_OF_NODE, nodeId };
};

export const navToggle = function({ name }) {
    return { type: actionTypes.NAV_TOGGLE, name };
};

export const setOutlineTreeNode = function({
    nodeId,
    parentNodeId,
    leadText,
    bodyText
}) {
    return {
        type: actionTypes.SET_OUTLINE_TREE_NODE,
        nodeId,
        parentNodeId,
        leadText,
        bodyText
    };
};

export const setOutlineTreeCurrentNode = function({ currentNodeId }) {
    return {
        type: actionTypes.SET_OUTLINE_TREE_CURRENT_NODE,
        currentNodeId
    };
};