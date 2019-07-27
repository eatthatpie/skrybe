import actionTypes from '@/actions/types';

const initialState = {
    outline: {
        name: 'Outline',
        isActive: true,
        items: [
            {
                label: 'One Liner',
                desc: 'One line description of your story'
            },
            {
                label: 'Story structure',
                desc: 'The beginning, the middle and the end'
            },
            {
                label: 'Untitled segment',
                desc: ''
            }
        ]
    },
    characters: {
        name: 'Characters',
        isActive: false,
        items: []
    },
    notes: {
        name: 'Notes',
        isActive: false,
        items: []
    }
};

export default function navReducer(state = initialState, { type, name }) {
    switch (type) {
        case actionTypes.NAV_TOGGLE:
            const isActive = state[name].isActive;

            return {
                ...state,
                [name]: {
                    ...state[name],
                    isActive: !isActive
                }
            };
        default:
            return state;
    }
};