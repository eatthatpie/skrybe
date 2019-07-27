const initialState = {
    outline: {
        isActive: false,
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
        isActive: false,
        items: []
    },
    notes: {
        isActive: false,
        items: []
    }
};

export default function navReducer(state = initialState, { name }) {
    switch (action.type) {
        case 'NAV_TOGGLE':
            const isActive = state[name].isActive;

            return {
                ...state,
                [name]: {
                    isActive: !isActive
                }
            };
        default:
            return state;
    }
};