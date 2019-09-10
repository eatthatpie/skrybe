import React from 'react';
import './TreeViewToggler.scss';

function TreeViewToggler(props) {
    return (
        <a
            className={`tree-view-toggler ${props.className}`}
            onClick={props.handleClick}
        >
            <span className="btn btn-reversed">
                <i className="fas fa-project-diagram"></i>
            </span>
        </a>
    );
}

export default TreeViewToggler;
