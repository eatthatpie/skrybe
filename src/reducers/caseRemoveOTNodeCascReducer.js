export default function(state, { nodeId }) {
    if (nodeId === 'root') {
        console.error(
            `
                [Outline Tree Reducer REMOVE_NODE_WITH_DESCENDANTS] You are not
                allowed to remove the root node.
            `
        );

        return {
            ...state
        };
    }

    if (!state.items.hasOwnProperty(nodeId)) {
        throw new Error(
            `
                [Outline Tree Reducer REMOVE_NODE_WITH_DESCENDANTS]
                There's no node with id ${nodeId}.
            `
        );
    }

    function findAll(nodeId) {
        return [].concat(
            [nodeId],
            ...state.items[nodeId].descendants.map(item => findAll(item))
        );
    }

    const all = findAll(nodeId);

    state.items[state.items[nodeId].parentNodeId].descendants =
        state.items[state.items[nodeId].parentNodeId].descendants.filter(
            item => item !== nodeId
        );

    for (let i = 0; i < all.length; i++) {
        delete state.items[all[i]];
    }

    return {
        ...state,
        items: state.items
    };
}
