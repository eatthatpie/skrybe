import Frame from '@/view/frame/Frame';
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

    const content = props.content.length > 0
        ? <Frame content={props.content} className="mt-10 mb-10" />
        : ''

    return (
        <li className={props.isActive ? 'is-active' : ''}>
            <a
                className=" h:bg-nav-ic fs-16"
                data-nav-name={props.navName}
                onClick={props.handleClick}
            >
                <i className="fas fa-angle-right"></i> {props.name}
            </a>
            {props.isActive && props.items.length > 0 ? childrenView : ''}
            {content}
        </li>
    );
}

export default NavItem;