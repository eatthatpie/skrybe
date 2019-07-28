import actionTypes from '@/actions/types';

const initialState = {
    lastId: 0,
    root: {
        leadText: 'Write down the one line description of your story.',
        bodyText: '',
        children: []
    }
};

export default function outlineTreeReducer(state = initialState, { type }) {
    switch (type) {
        default:
            return state;
    }
};