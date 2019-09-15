import { createSelector } from 'reselect';

const getCurrentNode = createSelector(
    state => {
        return state.outlineTree.items[
            state.outlineTree.currentNodeId
        ];
    },
    currentNode => currentNode
);

const getCurrentNodeParentId = createSelector(
    getCurrentNode,
    currentNode => {
        return currentNode.parentNodeId
    }
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

const canMoveUp = createSelector(
    getCurrentNode,
    currentNode => {
        return currentNode.parentNodeId !== null;
    }
);

const canMoveDown = createSelector(
    getCurrentNode,
    currentNode => {
        return currentNode.descendants.length > 0;
    }
);

const canMoveLeft = createSelector(
    getCurrentNodeParent,
    state => state.outlineTree,
    (parentNode, outlineTree) => {
        const allSiblings = parentNode ? parentNode.descendants : [];
        let currentNodeIndex = allSiblings.indexOf(outlineTree.currentNodeId);

        return currentNodeIndex > 0;
    }
);

const canMoveRight = createSelector(
    getCurrentNodeParent,
    state => state.outlineTree,
    (parentNode, outlineTree) => {
        const allSiblings = parentNode ? parentNode.descendants : [];
        let currentNodeIndex = allSiblings.indexOf(outlineTree.currentNodeId);

        return currentNodeIndex < allSiblings.length - 1;
    }
);

export {
    getCurrentNode,
    getCurrentNodeParent,
    getCurrentNodeDescendants,
    getCurrentNodeSiblings,
    getCurrentNodeParentId,
    canMoveUp,
    canMoveDown,
    canMoveLeft,
    canMoveRight
};