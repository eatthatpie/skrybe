export default function(state) {
    let currentEntry = state.items[state.currentNodeId];

    const currentNodeId = currentEntry.parentNodeId || state.currentNodeId;

    return {
        ...state,
        currentNodeId
    };
}
