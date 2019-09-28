import React from 'react';

export default function Frame(props) {
    return (
        <div
            dangerouslySetInnerHTML={{__html: props.content}}
            className={`frame bg-frame fs-8 mv-0 mh-20 pv-10 ph-15 ${props.className}`}
        />
    );
}
