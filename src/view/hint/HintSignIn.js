import React from 'react';
import Tooltip from '@/view/tooltip/Tooltip';

export default function HintSignIn(props) {
    return (
        <a
            className="hint-sign-in bg-primary h:bg-primary-lighten ph-25 sl:ph-20 h-60 sl:h-48 flex c-p br-50 z-2"
            onClick={props.handleClick}
        >
            <span>
                Save story
            </span>
            <Tooltip text="Sign in to save your story" />
        </a>
    );
}
