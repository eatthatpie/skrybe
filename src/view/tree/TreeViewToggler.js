import React from 'react';
import Tooltip from '@/view/tooltip/Tooltip';
import './TreeViewToggler.scss';

function TreeViewToggler(props) {
    return (
        <a
            className={`tree-view-toggler ${props.className}`}
            onClick={props.handleClick}
        >
            <span className="btn btn-reversed">
                <i className="fas fa-project-diagram" />
                <i className="fas fa-sticky-note" />
            </span>
            {props.title &&
                <Tooltip
                    text={props.title}
                    position="left"
                />
            }
        </a>
    );
}

export default TreeViewToggler;
