export default function(state) {
    let parentNodeId = state.items[state.currentNodeId].parentNodeId || null;

    if (!parentNodeId) {
        return {
            ...state
        };
    }

    const allSiblings = state.items[parentNodeId].descendants;
    let currentNodeIndex = allSiblings.indexOf(state.currentNodeId);

    if (currentNodeIndex >= allSiblings.length - 1) {
        return {
            ...state
        };
    } else {
        currentNodeIndex++;
    }

    const currentNodeId = allSiblings[currentNodeIndex];

    return {
        ...state,
        currentNodeId
    };
}
