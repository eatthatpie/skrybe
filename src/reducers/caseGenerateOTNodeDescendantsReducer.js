export default function(state, { nodeId, shouldMoveAfter }) {
    if (!state.items.hasOwnProperty(nodeId)) {
        throw new Error(`[Outline Tree Reducer GENERATE_DESCENDANTS_OF_NODE] There's no node with id ${nodeId}.`);
    }

    let entry = state.items[nodeId];

    if (entry.descendants.length > 0) {
        return {
            ...state
        };
    }

    if (entry.bodyText.length <= 0) {
        return {
            ...state
        };
    }

    const sentences = nodeId === 'root'
        ? [entry.bodyText.replace(/<[^>]*>?/gm, '').trim()]
        // add dot at the end of the body to avoid missing the sentence for
        // the lack of proper punctuation mark
        : `${entry.bodyText.replace(/<[^>]*>?/gm, '').trim()}.`
              .match(/\(?[^\.\?\!]+[\.!\?]\)?/g);


    let newEntries = {};
    let lastId = state.lastId;

    sentences.forEach(sentence => {
        let newEntryId = ++lastId;

        newEntries = Object.assign({}, newEntries, {
            [newEntryId]: {
                leadText: sentence.trim(),
                bodyText: '',
                parentNodeId: nodeId,
                descendants: [],
                siblings: []
            }
        });

        entry.descendants.push(newEntryId.toString())
    });

    Object.keys(newEntries).forEach(id => {
        newEntries[id].siblings = entry.descendants.filter(descId => descId !== id);
    });

    let currentNodeId = state.currentNodeId;

    if (shouldMoveAfter === true) {
        let nextSiblingIndex = entry.siblings.indexOf(state.currentNodeId) + 1;
        let nextSiblingId = entry.siblings[nextSiblingIndex];

        if (
            nextSiblingIndex < entry.siblings.length &&
            state.items[nextSiblingId].bodyText.length <= 0
        ) {
            currentNodeId = nextSiblingId;
        } else {
            currentNodeId = Object.keys(newEntries)[0];
        }
    }

    return {
        ...state,
        currentNodeId,
        lastId,
        items: {
            ...state.items,
            [nodeId]: entry,
            ...newEntries
        }
    };
}
