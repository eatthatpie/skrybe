import React from 'react';
import './ButtonCircle.scss';

function ButtonCircle({ handleClick }) {
    return (
        <button
            className="button-circle c-p"
            onClick={handleClick}
        >
            <i className="fas fa-check"></i>
        </button>
    );
};

export default ButtonCircle;