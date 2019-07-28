import actionTypes from './types';

export default function setOutlineTreeNodeAction({
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