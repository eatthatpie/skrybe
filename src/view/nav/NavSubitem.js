import React from 'react';

function NavSubitem(props) {
    return (
        <li className="bg-nav-i bc-bg h:bg-nav-ic">
            <a>
                {props.label}
                <small className="color-light fs-9">{props.desc}</small>
            </a>
        </li>
    );
}

export default NavSubitem;