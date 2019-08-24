import React from 'react';
import './Card.scss';

function Card({ leadText, bodyText }) {
    return (
        <div className="card bg-light">
            <div className="card-lead color-light">
                <div contentEditable="true">
                    {leadText}
                </div>
                <i className="fas fa-pencil-alt fs-10 color-light bg-light" />
            </div>
            <div className="card-body">
                <div contentEditable="true">
                    {bodyText}
                </div>
                <i className="fas fa-pencil-alt fs-10 color-light bg-light" />
            </div>
        </div>
    );
}

export default Card;