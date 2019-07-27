import actionTypes from './types';

export default function navToggleAction({ name }) {
    return { type: actionTypes.NAV_TOGGLE, name };
};