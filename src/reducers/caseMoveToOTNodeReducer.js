export default function(state, { nodeId }) {
    return {
        ...state,
        currentNodeId: nodeId
    };
}
