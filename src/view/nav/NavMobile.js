import React from 'react';
import Hamburger from '@/view/hamburger/Hamburger';
import './NavMobile.scss';

function NavMobile(props) {
    return (
        <nav className={
            `nav-mobile flex flex-normal flex-sb fixed cover-top h-60 bg-black z-550 ph-15 ${props.isEditMode ? 'is-edit-mode' : ''} ${props.isTreeMode ? 'is-tree-mode' : ''}`
        }>
            <Hamburger handleClick={props.openNavAsideMobile} />
            <div className="flex flex-normal h-100p">
                <a
                    className={`flex ph-10 ${!props.canMoveUp ? 'is-inactive' : ''}`}
                    onClick={props.moveUp}
                >
                    <i className="fas fa-angle-up fs-24" />
                </a>
                <a
                    className={`flex ph-10 ${!props.canMoveDown ? 'is-inactive' : ''}`}
                    onClick={props.moveDown}
                >
                    <i className="fas fa-angle-down fs-24" />
                </a>
                <a
                    className={`flex ph-10 ${!props.canMoveLeft ? 'is-inactive' : ''}`}
                    onClick={props.moveLeft}
                >
                    <i className="fas fa-angle-left fs-24" />
                </a>
                <a
                    className={`flex ph-10 ${!props.canMoveRight ? 'is-inactive' : ''}`}
                    onClick={props.moveRight}
                >
                    <i className="fas fa-angle-right fs-24" />
                </a>
                <a
                    className="flex ph-10"
                    onClick={() => { props.toggleTreeMode({ isTreeMode: !props.isTreeMode }) }}
                >
                    <i className="fas fa-project-diagram fs-15" />
                </a>
            </div>
        </nav>
    );
}

export default NavMobile;
