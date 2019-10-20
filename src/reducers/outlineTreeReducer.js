import actionTypes from '@/actions/types';

const initialState = {
    lastId: 0,
    currentNodeId: 'root',
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

// @FIXME: refactor
export default function outlineTreeReducer(state = initialState, {
    type,
    nodeId,
    parentNodeId,
    leadText,
    bodyText,
    shouldMoveAfter,
    dangerousOutlineTree
}) {
    switch (type) {
        case actionTypes.MOVE_TO_NODE: {
            return {
                ...state,
                currentNodeId: nodeId
            };
        }
        case actionTypes.DANGEROUSLY_RESET_OUTLINE_TREE: {
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
        case actionTypes.SET_OUTLINE_TREE_NODE: {
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
        case actionTypes.MOVE_UP: {
            let currentEntry = state.items[state.currentNodeId];

            const currentNodeId = currentEntry.parentNodeId || state.currentNodeId;

            return {
                ...state,
                currentNodeId
            }
        }
        case actionTypes.MOVE_DOWN: {
            let currentEntry = state.items[state.currentNodeId];

            const currentNodeId = currentEntry.descendants[0] || state.currentNodeId;

            return {
                ...state,
                currentNodeId
            }
        }
        case actionTypes.MOVE_LEFT: {
            let parentNodeId = state.items[state.currentNodeId].parentNodeId || null;

            if (!parentNodeId) {
                return {
                    ...state
                };
            }

            const allSiblings = state.items[parentNodeId].descendants;
            let currentNodeIndex = allSiblings.indexOf(state.currentNodeId);

            if (currentNodeIndex <= 0) {
                return {
                    ...state
                };
            } else {
                currentNodeIndex--;
            }

            const currentNodeId = allSiblings[currentNodeIndex];

            return {
                ...state,
                currentNodeId
            }
        }
        case actionTypes.MOVE_RIGHT: {
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
            }
        }
        case actionTypes.REMOVE_NODE_WITH_DESCENDANTS: {
            if (nodeId === 'root') {
                console.error(`[Outline Tree Reducer REMOVE_NODE_WITH_DESCENDANTS] You are not allowed to remove the root node.`);

                return {
                    ...state
                };
            }

            if (!state.items.hasOwnProperty(nodeId)) {
                throw new Error(`[Outline Tree Reducer REMOVE_NODE_WITH_DESCENDANTS] There's no node with id ${nodeId}.`);
            }

            function findAll(nodeId) {
                return [].concat([nodeId], ...state.items[nodeId].descendants.map(item => findAll(item)));
            }

            const all = findAll(nodeId);

            state.items[state.items[nodeId].parentNodeId].descendants =
                state.items[state.items[nodeId].parentNodeId].descendants.filter(item => item !== nodeId);

            for (let i = 0; i < all.length; i++) {
                delete state.items[all[i]];
            }

            return {
                ...state,
                items: state.items
            };
        }
        default:
            return state;
    }
};