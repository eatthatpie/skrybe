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
        <nav className={`nav-aside bg-primary color-light after:bg-primary ${props.isOpenMobile ? 'is-open' : ''}`}>
            <button
                className="nav-aside-close"
                onClick={props.closeNavAsideMobile}
                aria-label="close"
            >
                <IconClose />
            </button>
            <ul className="list">
                <li className="p-20">
                    <small
                        className="d-b fs-16"
                        style={{ position: 'relative', top: '-11px' }}
                    >
                        Current project
                    </small>
                    <span className="fs-32">
                        Farewell to Arms
                    </span>
                </li>
                <li>
                    <a className="h:bg-primary-light fs-17">
                        Tags
                    </a>
                </li>
                <li>
                    <a className="h:bg-primary-light fs-17">
                        Story statistics
                    </a>
                </li>
                <li>
                    <a className="h:bg-primary-light fs-17">
                        Story summary
                    </a>
                </li>
                <li class="color-primary-bright fs-13 p-20 pt-35 pb-10 text-upper">
                    <span>
                        Other stuff
                    </span>
                </li>
                <li>
                    <a className="h:bg-primary-light fs-17">
                        All projects
                    </a>
                </li>
                <li>
                    <a className="h:bg-primary-light fs-17">
                        Templates
                    </a>
                </li>
                <li class="color-primary-bright fs-13 p-20 pt-35 pb-10 text-upper">
                    <span>
                        Stats and settings
                    </span>
                </li>
                <li>
                    <a className="h:bg-primary-light fs-17">
                        Usage
                    </a>
                </li>
                <li>
                    <a className="h:bg-primary-light fs-17">
                        Settings
                    </a>
                </li>
                <li>
                    <a className="h:bg-primary-light fs-17">
                        Your theme
                    </a>
                </li>
                <li class="color-primary-bright fs-13 p-20 pt-35 pb-10 text-upper">
                    <span>
                        More
                    </span>
                </li>
                <li>
                    <a className="h:bg-primary-light fs-17">
                        Do you want more?
                    </a>
                </li>
                <li class="fs-17 pt-20">
                    &nbsp;
                </li>
                <li class="bg-primary-dark h:bg-primary-light mt-30">
                    <a className="fs-17">
                        <i class="far fa-question-circle mr-10" />
                        Quick help
                    </a>
                </li>
                <li class="bg-primary-dark h:bg-primary-light">
                    <a className="fs-17">
                        <i class="fa fa-plus mr-10" />
                        Create new story
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default NavAside;