import React from 'react';
import Hamburger from '@/view/hamburger/Hamburger';
import './NavMobile.scss';

function NavMobile(props) {
    return (
        <nav className="nav-mobile flex flex-normal flex-sb fixed cover-top h-60 bg-black z-550 ph-15">
            <Hamburger handleClick={props.openNavAsideMobile} />
            <div className="flex flex-normal h-100p">
                <a className="flex ph-10">
                    <i className="fas fa-angle-up fs-24" />
                </a>
                <a className="flex ph-10">
                    <i className="fas fa-angle-down fs-24" />
                </a>
                <a className="flex ph-10">
                    <i className="fas fa-angle-left fs-24" />
                </a>
                <a className="flex ph-10">
                    <i className="fas fa-angle-right fs-24" />
                </a>
            </div>
        </nav>
    );
}

export default NavMobile;
