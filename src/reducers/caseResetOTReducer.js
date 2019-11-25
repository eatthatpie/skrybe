export default function(state, { dangerousOutlineTree }) {
    Object.keys(dangerousOutlineTree.items).forEach(nodeId => {
        if (!dangerousOutlineTree.items[nodeId].descendants) {
            dangerousOutlineTree.items[nodeId] = Object.assign({}, dangerousOutlineTree.items[nodeId], {
                descendants: []
            });
        }

        if (!dangerousOutlineTree.items[nodeId].siblings) {
            dangerousOutlineTree.items[nodeId] = Object.assign({}, dangerousOutlineTree.items[nodeId], {
                siblings: []
            });
        }

        if (
            !dangerousOutlineTree.items[nodeId].parentNodeId &&
            dangerousOutlineTree.items[nodeId].parentNodeId !== null
        ) {
            dangerousOutlineTree.items[nodeId] = Object.assign({}, dangerousOutlineTree.items[nodeId], {
                parentNodeId: null
            });
        }
    });

    return { ...dangerousOutlineTree };
}
