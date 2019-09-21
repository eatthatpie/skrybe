import React from 'react';
import TreeMap from '@/view/tree/TreeMap';

export default function Map({ data, handleClick, currentNodeId }) {
    let dataMapped = {};
    let keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
        dataMapped = Object.assign({}, dataMapped, {
            [keys[i]]: {
                children: data[keys[i]].descendants,
                text: data[keys[i]].leadText || null,
                handleClick: () => { handleClick(keys[i]) },
                className: keys[i] === currentNodeId ? 'is-current' : null
            }
        });
    }

    return (
        <div className="tree-view flex h-100p">
            <TreeMap data={dataMapped} />
        </div>
    );
}
