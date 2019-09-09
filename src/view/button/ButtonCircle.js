import React from 'react';
import './ButtonCircle.scss';

function ButtonCircle({ handleClick, iconClassName }) {
    return (
        <button
            className="button-circle c-p"
            onClick={handleClick}
        >
            <i className={iconClassName} />
        </button>
    );
};

export default ButtonCircle;