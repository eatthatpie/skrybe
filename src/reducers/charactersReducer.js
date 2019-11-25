// @deprecated

import actionTypes from '@/actions/types';

const initialState = {};

export default function charactersReducer(state = initialState, { type, nodeId, characterNames }) {
    switch (type) {
        case actionTypes.UPDATE_CHARACTERS:
            return {
                ...state,
                byNode: {
                    [nodeId]: {
                        characterNames
                    }
                }
            };
        default:
            return state;
    }
};