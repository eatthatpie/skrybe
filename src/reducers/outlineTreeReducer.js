import actionTypes from '@/actions/types';

const initialState = {
    lastId: 0,
    items: {
        root: {
            leadText: 'Write down the one line description of your story.',
            bodyText: '',
            parentNodeId: null,
            descendants: ['1'],
            siblings: []
        },
        '1': {
            leadText: '',
            bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ligula nec purus bibendum consequat.',
            parentNodeId: 'root',
            descendants: ['2', '3'],
            siblings: []
        },
        '2': {
            leadText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            bodyText: 'Donec congue eget arcu quis molestie. Integer nec orci in orci faucibus suscipit eu sit amet lectus.',
            parentNodeId: '1',
            descendants: ['4', '5'],
            siblings: ['3']
        },
        '3': {
            leadText: 'Curabitur ac ligula nec purus bibendum consequat.',
            bodyText: 'Sed sagittis, lacus ac lobortis congue, justo massa sodales tortor, et efficitur urna elit a elit. Mauris at risus malesuada, molestie purus et, imperdiet risus.',
            parentNodeId: '1',
            descendants: ['6', '7'],
            siblings: ['2']
        },
        '4': {
            leadText: 'Donec congue eget arcu quis molestie.',
            bodyText: '',
            parentNodeId: '2',
            descendants: [],
            siblings: ['5']
        },
        '5': {
            leadText: 'Integer nec orci in orci faucibus suscipit eu sit amet lectus.',
            bodyText: '',
            parentNodeId: '2',
            descendants: [],
            siblings: ['4']
        },
        '6': {
            leadText: 'Sed sagittis, lacus ac lobortis congue, justo massa sodales tortor, et efficitur urna elit a elit.',
            bodyText: '',
            parentNodeId: '3',
            descendants: [],
            siblings: ['7']
        },
        '7': {
            leadText: 'Mauris at risus malesuada, molestie purus et, imperdiet risus.',
            bodyText: '',
            parentNodeId: '3',
            descendants: [],
            siblings: ['6']
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