export default function(state, {
    nodeId,
    parentNodeId,
    leadText,
    bodyText,
    shouldMoveAfter
}) {
    if (nodeId && parentNodeId) {
        throw new Error(`[Outline Tree Reducer SET_OUTLINE_TREE_NODE] You cannot specified both nodeId and parentNodeId at the same time.`);
    }
    
    if (nodeId && !state.items.hasOwnProperty(nodeId)) {
        throw new Error(`[Outline Tree Reducer SET_OUTLINE_TREE_NODE] There's no node with id ${nodeId}.`);
    }
    
    if (nodeId) {
        let entry = state.items[nodeId]
    
        entry.leadText = (leadText !== null && leadText !== undefined)
            ? leadText
            : entry.leadText;
        entry.bodyText = (bodyText !== null && bodyText !== undefined)
            ? bodyText
            : entry.bodyText;
    
        return {
            ...state,
            items: {
                ...state.items,
                [nodeId]: entry
            }
        };
    }
    
    let lastId = state.lastId;
    lastId++;
    const entryId = lastId.toString();
    
    let parentNode = Object.assign({}, state.items[parentNodeId]);
    
    let siblingsNodes = {};
    parentNode.descendants.forEach(descId => {
        let descIdString = descId.toString();
    
        siblingsNodes = Object.assign({}, siblingsNodes, {
            [descIdString]: state.items[descId]
        });
    
        siblingsNodes[descIdString].siblings.push(entryId);
    });
    
    let entry = {
        leadText,
        bodyText,
        parentNodeId: parentNodeId,
        descendants: [],
        siblings: [].concat(parentNode.descendants)
    };
    
    let currentNodeId = shouldMoveAfter === true
        ? entryId
        : state.currentNodeId;
    
    return {
        ...state,
        currentNodeId,
        lastId,
        items: {
            ...state.items,
            ...siblingsNodes,
            [entryId]: entry,
            [parentNodeId]: {
                ...parentNode,
                descendants: [].concat(parentNode.descendants, [entryId])
            }
        }
    };
}