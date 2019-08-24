import React from 'react';
import ContentEditable from '@/view/editable/ContentEditable';
import './Card.scss';

function Card({ leadText, bodyText, handleChangeLeadText, handleChangeBodyText }) {
    return (
        <div className="card bg-light">
            <div className="card-lead color-light">
                <ContentEditable
                    html={leadText}
                    isDisabled={false}
                    onChange={handleChangeLeadText}
                />
                <i className="fas fa-pencil-alt fs-10 color-light bg-light" />
            </div>
            <div className="card-body">
                <ContentEditable
                    html={bodyText}
                    isDisabled={false}
                    onChange={handleChangeBodyText}
                />
                <i className="fas fa-pencil-alt fs-10 color-light bg-light" />
            </div>
        </div>
    );
}

export default Card;