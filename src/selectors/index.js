import { createSelector } from 'reselect';

const getCurrentNodeId = createSelector(
    function(state) {
        return state.outlineTree.currentNodeId;
    },
    function(currentNodeId) {
        return currentNodeId;
    }
);

const getCurrentNode = createSelector(
    getCurrentNodeId,
    function(state) {
        return state.outlineTree.items;
    },
    function(currentNodeId, items) {
        return items[currentNodeId];
    }
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

const getOutlineTreeItemsCount = createSelector(
    state => state.outlineTree.items,
    function(items) {
        return Object.keys(items).length
    }
);

const canAddChildren = createSelector(getCurrentNode, function(currentNode) {
    return !currentNode.descendants || currentNode.descendants.length <= 0;
});

const canAddSiblings = createSelector(
    getCurrentNodeId,
    getCurrentNodeParentId,
    function(currentNodeId, parentNodeId) {
        return parentNodeId !== 'root' && currentNodeId !== 'root';
    }
);

const canMoveDown = createSelector(getCurrentNode, function(currentNode) {
    return currentNode.descendants.length > 0;
});

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

const canMoveUp = createSelector(getCurrentNode, function(currentNode) {
    return currentNode.parentNodeId !== null;
});

export {
    canAddChildren,
    canAddSiblings,
    canMoveDown,
    canMoveLeft,
    canMoveRight,
    canMoveUp,
    getCurrentNode,
    getCurrentNodeDescendants,
    getCurrentNodeId,
    getCurrentNodeParent,
    getCurrentNodeParentId,
    getCurrentNodeSiblings,
    getOutlineTreeItemsCount
};
