import actionTypes from '@/actions/types';

const initialState = {
    items: {
        // outline: {
        //     name: 'Outline',
        //     isActive: false,
        //     content: '',
        //     isItemless: true,
        //     items: [
        //         {
        //             label: 'One Liner',
        //             desc: 'One line description of your story'
        //         },
        //         {
        //             label: 'Story structure',
        //             desc: 'The beginning, the middle and the end'
        //         },
        //         {
        //             label: 'Untitled segment',
        //             desc: ''
        //         }
        //     ]
        // },
        allProjects: {
            name: 'All projects',
            isActive: false,
            content: `This is not available yet.`,
            items: []
        },
        characters: {
            name: 'Characters',
            isActive: false,
            content: `This is not available yet.`,
            // content: `
            //     To add a character simply type the name in capital letters, like JOHN, JANE while editing your story card.
            //     <br/><br/>
            //     Remember, that each letter matters, so JANES will be considered as a character other than JANE.`,
            items: []
        },
        // notes: {
        //     name: 'Notes',
        //     isActive: false,
        //     content: '',
        //     items: []
        // }
    }
};

export default function navReducer(state = initialState, { type, name }) {
    switch (type) {
        case actionTypes.NAV_TOGGLE:
            const isActive = state.items[name].isActive;

            return {
                ...state,
                items: {
                    ...state.items,
                    [name]: {
                        ...state.items[name],
                        isActive: !isActive
                    }
                }
            };
        default:
            return state;
    }
};