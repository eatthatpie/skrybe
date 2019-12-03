import Card from '@/view/card/Card';
import React from 'react';
import { usePlaceholder } from '@/hooks';
import DetailedViewNav from '@/view/editor/DetailedViewNav';

export default function CardsGridView(props) {
    const placeholder = usePlaceholder(props.currentNodeId, props.parentNodeId);

    return (
        <div className="cards-grid-view flex h-100p">
            <DetailedViewNav />
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
