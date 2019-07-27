import NavSubitem from '@/view/nav/NavSubitem';
import React from 'react';

function NavItem(props) {
    const childrenView = (
        <ol className="list">
            {props.items.map(item => (
                <NavSubitem
                    key={item.label}
                    label={item.label}
                    desc={item.desc}
                />
            ))}
        </ol>
    );

    return (
        <li className={props.isActive ? 'is-active' : ''}>
            <a
                className="h:color-primary fs-16"
                data-nav-name={props.navName}
                onClick={props.handleClick}
            >
                <i className="fas fa-caret-right"></i> {props.name}
            </a>
            {props.isActive ? childrenView : ''}
        </li>
    );
}

export default NavItem;