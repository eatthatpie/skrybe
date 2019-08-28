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
        ? (
              <div
                  dangerouslySetInnerHTML={{__html: props.content}}
                  className="nav-aside-content"
              />
          )
        : ''

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
            {content}
        </li>
    );
}

export default NavItem;