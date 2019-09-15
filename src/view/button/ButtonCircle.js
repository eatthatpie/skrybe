import React from 'react';
import Tooltip from '@/view/tooltip/Tooltip';
import './ButtonCircle.scss';

function ButtonCircle({ className, handleClick, iconClassName, title }) {
    return (
        <button
            className={`button-circle c-p ${className}`}
            onClick={handleClick}
        >
            <i className={iconClassName} />
            {title && <Tooltip text={title} />}
        </button>
    );
};

export default ButtonCircle;