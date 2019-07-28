import actionTypes from '@/actions/types';

const initialState = {
    lastId: 0,
    root: {
        leadText: '',
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