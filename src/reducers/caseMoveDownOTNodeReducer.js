export default function(state) {
    let currentEntry = state.items[state.currentNodeId];

    const currentNodeId = currentEntry.descendants[0] || state.currentNodeId;

    return {
        ...state,
        currentNodeId
    };
}
