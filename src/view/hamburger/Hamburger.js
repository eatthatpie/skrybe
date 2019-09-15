import React from 'react';
import './Hamburger.scss';

function Hamburger(props) {
    return (
        <a
            className="hamburger flex flex-col-center"
            onClick={props.handleClick}
        >
            <span />
            <span />
            <span />
        </a>
    );
}

export default Hamburger;
