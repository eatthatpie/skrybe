import React from 'react';
import './CardGhost.scss';

function CardGhost({ onClick, className, iconClassName }) {

    return (
        <div
            className={`card-ghost d-inb bg-light c-p flex ${className}`}
            onClick={onClick}
        >
            <i className={`fas fa-${iconClassName}`} />
        </div>
    );
}

export default CardGhost;