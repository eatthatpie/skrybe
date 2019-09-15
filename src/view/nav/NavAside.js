import IconClose from '@/view/icon/IconClose';
import NavItem from '@/view/nav/NavItem';
import React from 'react';
import './NavAside.scss';

function NavAside(props) {
    return (
        <nav className={`nav-aside bg-light ${props.isOpenMobile ? 'is-open' : ''}`}>
            <button
                className="nav-aside-close"
                onClick={props.closeNavAsideMobile}
            >
                <IconClose />
            </button>
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
                {props.isAuth &&
                    <li className="bg-nav-i">
                        <a onClick={props.handleSignOut}>
                            <i class="fas fa-power-off" /> Sign out
                        </a>
                    </li>
                }
            </ul>
        </nav>
    );
}

export default NavAside;