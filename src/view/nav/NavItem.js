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
                  className="frame bg-frame fs-8 mv-0 mh-20 pv-10 ph-15"
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