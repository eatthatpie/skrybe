import React from 'react';
import './NavAside.scss';

const items = [
    {
        label: 'One Liner',
        desc: 'One line description of your story'
    },
    {
        label: 'Story structure',
        desc: 'The beginning, the middle and the end'
    },
    {
        label: 'Untitled segment',
        desc: ''
    }
];

const itemsView = items.map(item => (
    <li className="bg-nav-i bc-bg h:bg-nav-ic">
        <a>
            {item.label}
            <small className="color-light fs-9">{item.desc}</small>
        </a>
    </li>
));

function NavAside(props) {
    return (
        <nav className="nav-aside bg-light">
            <ul className="list">
                <li>
                    <a className="h:color-primary fs-16">
                        <i className="fas fa-caret-right"></i> Outline
                    </a>
                    <ol className="list">
                        {itemsView}
                    </ol>
                </li>
                <li>
                    <a className="h:color-primary fs-16">
                        <i className="fas fa-caret-right"></i> Characters
                    </a>
                </li>
                <li>
                    <a className="h:color-primary fs-16">
                        <i className="fas fa-caret-right"></i> Notes
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default NavAside;