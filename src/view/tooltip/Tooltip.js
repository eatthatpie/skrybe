import React from 'react';
import './Tooltip.scss';

export default function Tooltip(props) {
    return (
        <div className={`tooltip tooltip--${props.position ? props.position : 'default'}`}>
            <span>{props.text}</span>
        </div>
    );
}
