import React from 'react';
import './Toolbar.scss';

export default function Toolbar() {
    return (
        <div className="toolbar bg-primary-light color-light">
            <div className="toolbar-hamburger">
                <i className="fa fa-bars fs-20" />
            </div>
            <div className="toolbar-logo">
                <span>
                    Skrybe
                </span>
            </div>
            <div className="toolbar-picker">
                <div className="fs-13">
                    Current project
                </div>
                <div className="pt-2">
                    <span className="fs-25">
                        Blitzkrieg Inc.
                    </span>
                </div>
            </div>
            <div className="toolbar-nav">
                <a className="ph-15">
                    <i className="fa fa-share-alt fs-20 lh-36" />
                </a>
                <a className="ph-15">
                    <i className="fa fa-user fs-20 lh-36" />
                </a>
            </div>
        </div>
    );
}
