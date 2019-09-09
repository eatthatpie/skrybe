import NavItem from '@/view/nav/NavItem';
import React from 'react';
import './NavAside.scss';

function NavAside(props) {
    return (
        <nav className="nav-aside bg-light">
            <ul className="list">
                {Object.keys(props.nav).map(navName => 
                    <NavItem
                        key={navName}
                        navName={navName}
                        name={props.nav[navName].name}
                        items={props.nav[navName].items}
                        content={props.nav[navName].content}
                        isActive={props.nav[navName].isActive}
                        handleClick={props.handleClick}
                    />
                )}
            </ul>
        </nav>
    );
}

export default NavAside;