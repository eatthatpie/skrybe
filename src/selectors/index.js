import { createSelector } from 'reselect';

const getCurrentNode = createSelector(
    state => {
        return state.outlineTree.items[
            state.outlineTreeNav.currentNodeId
        ];
    },
    currentNode => currentNode
);

const getCurrentNodeParent = createSelector(
    getCurrentNode,
    state => state.outlineTree,
    (currentNode, outlineTree) => {
        return outlineTree.items[currentNode.parentNodeId];
    }
);

const getCurrentNodeDescendants = createSelector(
    getCurrentNode,
    state => state.outlineTree,
    (currentNode, outlineTree) => {
        return currentNode.descendats.map(id => outlineTree[id]);
    }
);

const getCurrentNodeSiblings = createSelector(
    getCurrentNode,
    state => state.outlineTree,
    (currentNode, outlineTree) => {
        return currentNode.siblings.map(id => outlineTree[id]);
    }
);

export {
    getCurrentNode,
    getCurrentNodeParent,
    getCurrentNodeDescendants,
    getCurrentNodeSiblings
};