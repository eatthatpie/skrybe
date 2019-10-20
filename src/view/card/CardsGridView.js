import Card from '@/view/card/Card';
import CardGhost from '@/view/card/CardGhost';
import React from 'react';
import { usePlaceholder } from '@/hooks';

export default function CardsGridView(props) {
    const placeholder = usePlaceholder(props.currentNodeId, props.parentNodeId);

    return (
        <div className="cards-grid-view flex h-100p">
            <CardGhost
                className={
                    `to-top ${!props.canMoveUp ? 'is-inactive' : ''}`
                }
                iconClassName="angle-up"
                onClick={() => { props.moveUp(); }}
            />
            <CardGhost
                className={
                    `to-bottom ${!props.canMoveDown ? 'is-inactive' : ''}`
                }
                iconClassName="angle-down"
                onClick={() => { props.moveDown(); }}
            />
            <CardGhost
                className={
                    `to-left ${!props.canMoveLeft ? 'is-inactive' : ''}`
                }
                iconClassName="angle-left"
                onClick={() => { props.moveLeft(); }}
            />
            <CardGhost
                className={
                    `to-right ${!props.canMoveRight ? 'is-inactive' : ''}`
                }
                iconClassName="angle-right"
                onClick={() => { props.moveRight(); }}
            />
            <Card
                leadText={props.leadText}
                bodyText={props.bodyText}
                parentBodyText={props.parentNode ? props.parentNode.bodyText : null}
                handleChangeLeadText={props.handleChangeLeadText}
                handleChangeBodyText={props.handleChangeBodyText}
                placeholder={placeholder}
                onFocus={props.handleCardFocus}
                onBlur={props.handleCardBlur}
            />
        </div>
    );
};
