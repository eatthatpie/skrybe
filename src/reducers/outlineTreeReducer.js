import actionTypes from '@/actions/types';

const initialState = {
    lastId: 0,
    items: {
        root: {
            leadText: 'Write down the one line description of your story.',
            bodyText: '',
            parentNodeId: null,
            descendants: [],
            siblings: []
        }
    }
};

export default function outlineTreeReducer(state = initialState, {
    type,
    nodeId,
    parentNodeId,
    leadText,
    bodyText
}) {
    switch (type) {
        case actionTypes.SET_OUTLINE_TREE_NODE: {
            if (nodeId && parentNodeId) {
                throw new Error(`[Outline Tree Reducer SET_OUTLINE_TREE_NODE] You cannot specified both nodeId and parentNodeId at the same time.`);
            }

            if (nodeId && !state.items.hasOwnProperty(nodeId)) {
                throw new Error(`[Outline Tree Reducer SET_OUTLINE_TREE_NODE] There's no node with id ${nodeId}.`);
            }

            if (nodeId) {
                let entry = state.items[nodeId]

                entry.leadText = leadText || entry.leadText;
                entry.bodyText = bodyText || entry.bodyText;

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

            return {
                ...state,
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
        case actionTypes.GENERATE_DESCENDANTS_OF_NODE: {
            if (!state.items.hasOwnProperty(nodeId)) {
                throw new Error(`[Outline Tree Reducer GENERATE_DESCENDANTS_OF_NODE] There's no node with id ${nodeId}.`);
            }

            let entry = state.items[nodeId];

            if (entry.descendants.length > 0) {
                return {
                    ...state
                };
            }

            const sentences = entry.bodyText
                .match(/[^\.!\?]+[\.!\?]+/g)
                .map(item => item.trim());

            let newEntries = {};
            let lastId = state.lastId;

            sentences.forEach(sentence => {
                let newEntryId = ++lastId;

                newEntries = Object.assign({}, newEntries, {
                    [newEntryId]: {
                        leadText: sentence,
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

            return {
                ...state,
                lastId,
                items: {
                    ...state.items,
                    [nodeId]: entry,
                    ...newEntries
                }
            };
        }
        default:
            return state;
    }
};