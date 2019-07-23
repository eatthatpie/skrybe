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
    },
    {
        label: '[ + ]',
        desc: ''
    },
];

const itemsView = items.map(item => (
    <li>
        <a>
            {item.label}
            <small>{item.desc}</small>
        </a>
    </li>
));

function NavAside(props) {
    return (
        <nav className="nav-aside">
            <ul className="list">
                <li>
                    <a>
                        <i class="fas fa-caret-right"></i> Outline
                    </a>
                    <ol className="list">
                        {itemsView}
                    </ol>
                </li>
                <li>
                    <a>
                        <i class="fas fa-caret-right"></i> Characters
                    </a>
                </li>
                <li>
                    <a>
                        <i class="fas fa-caret-right"></i> Notes
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default NavAside;