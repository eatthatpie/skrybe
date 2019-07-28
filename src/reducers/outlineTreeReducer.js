import actionTypes from '@/actions/types';

const initialState = {
    lastId: 0,
    root: {
        leadText: 'Write down the one line description of your story.',
        bodyText: '',
        parentNodeId: null
    },
    items: []
};

export default function outlineTreeReducer(state = initialState, {
    type,
    nodeId,
    parentNodeId,
    leadText,
    bodyText
}) {
    switch (type) {
        case actionTypes.SET_OUTLINE_TREE_NODE:
            if (nodeId && !state.items.hasOwnProperty(nodeId)) {
                throw new Error(`[Outline Tree Reducer] There's no node with id ${nodeId}.`);
            }

            let lastId = state.lastId;
            let id = nodeId ? nodeId : ++lastId;

            let entry = nodeId
                ? state.items[nodeId]
                : {
                      leadText: '',
                      bodyText: '',
                      parentNodeId: null
                  };

            entry.leadText = leadText || entry.leadText;
            entry.bodyText = bodyText || entry.bodyText;
            entry.parentNodeId = parentNodeId || entry.parentNodeId;

            return {
                ...state,
                lastId,
                items: {
                    ...state.items,
                    [id]: entry
                }
            };
        default:
            return state;
    }
};