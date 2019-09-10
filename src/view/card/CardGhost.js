import React from 'react';
import './CardGhost.scss';

function CardGhost({ onClick, className, iconClassName }) {
    return (
        <div
            className={`card-ghost btn d-inb c-p flex ${className}`}
            onClick={onClick}
        >
            <i className={`fas fa-${iconClassName}`} />
        </div>
    );
}

export default CardGhost;