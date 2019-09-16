import React from 'react';
import './Content.scss';

export default function Content(props) {
    return (
        <div className={`content ph-15 ${props.className ? props.className : ''}`}>
            {props.children}
        </div>
    );
}
