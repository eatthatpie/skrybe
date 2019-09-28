import IconClose from '@/view/icon/IconClose';
import NavItem from '@/view/nav/NavItem';
import React from 'react';
import './NavAside.scss';

function NavAside(props) {
    function onClickQuickHelp() {
        props.togglePopup({
            isActive: true,
            type: 'tutorial-step-1',
            props: {
                headerText: 'Quick help',
                isGenerateButtonHidden: true,
                onClickGoBackToEditing() {
                    props.togglePopup({
                        isActive: false
                    });
                }
            }
        });
    }

    return (
        <nav className={`nav-aside bg-light ${props.isOpenMobile ? 'is-open' : ''}`}>
            <button
                className="nav-aside-close"
                onClick={props.closeNavAsideMobile}
                aria-label="close"
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
                <li className="bg-nav-i">
                    <a onClick={onClickQuickHelp}>
                        <i className="far fa-question-circle"></i> Quick help
                    </a>
                </li>
                {props.isAuth &&
                    <li className="bg-nav-i">
                        <a onClick={props.handleSignOut}>
                            <i className="fas fa-power-off" /> Sign out
                        </a>
                    </li>
                }
            </ul>
        </nav>
    );
}

export default NavAside;