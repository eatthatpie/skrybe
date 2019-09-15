import React from 'react';

export default function Map() {
    const data = {
        root: {
            children: ['1', '2', '18', '19', '20']
        },
        '1': {
            children: ['3', '4', '5']
        },
        '2': {
            children: ['6', '7']
        },
        '3': {
            children: ['8']
        },
        '4': {
            children: ['9', '10']
        },
        '5': {
            children: ['11', '12', '13']
        },
        '6': {
            children: ['14']
        },
        '7': {
            children: []
        },
        '8': {
            children: []
        },
        '9': {
            children: ['15']
        },
        '10': {
            children: []
        },
        '11': {
            children: ['21', '22', '23']
        },
        '12': {
            children: ['24', '25', '26']
        },
        '13': {
            children: ['27', '28', '29']
        },
        '14': {
            children: []
        },
        '15': {
            children: ['16', '17']
        },
        '16': {
            children: []
        },
        '17': {
            children: []
        },
        '18': {
            children: []
        },
        '19': {
            children: []
        },
        '20': {
            children: []
        },
        '21': {
            children: []
        },
        '22': {
            children: []
        },
        '23': {
            children: []
        },
        '24': {
            children: []
        },
        '25': {
            children: []
        },
        '26': {
            children: []
        },
        '27': {
            children: []
        },
        '28': {
            children: []
        },
        '29': {
            children: ['30', '31', '32']
        },
        '30': {
            children: []
        },
        '31': {
            children: []
        },
        '32': {
            children: []
        }
    };

    function circle(x, y) {
        const radius = 6;

        return (
            <g style={{zIndex: 10, position: 'relative'}}>
                <circle
                    cx={x}
                    cy={y}
                    r={radius}
                    fill="#319869"
                    stroke="white"
                    stroke-width="2"
                />
            </g>
        );
    }

    function drawMapItem(key, level, left, right, parentX) {
        const item = data[key];
        const pointx = (right + left) / 2;
        const stepY = 40;

        let out = [circle(pointx, stepY * level)];

        if (key !== 'root') {
            out.push(
                <g>
                    <path
                        d={
                            `
                                M ${parentX} ${stepY * (level - 1) + 5}
                                C ${parentX} ${stepY * (level - 0.5)},
                                ${pointx} ${stepY * (level - 1)},
                                ${pointx} ${stepY * level - 5}
                            `
                        }
                        stroke="white"
                        stroke-width="2"
                        fill="transparent"
                        style={{zIndex: 10, position: 'relative'}}
                    />
                </g>
            );
        }

        if (item.children.length > 0) {
            const step = (right - left) / item.children.length;

            item.children.forEach((child, index) => {
                out = [].concat(
                    out,
                    drawMapItem(
                        child,
                        level + 1,
                        left + (index * step),
                        left + ((index + 1) * step),
                        pointx
                    )
                );
            });
        }

        return out;
    }

    return (
        <svg height="400" width="800">
            <g>
                <rect height="600" width="800" fill="#282c34" />
                {drawMapItem('root', 1, 0, 800)}
            </g>
        </svg>
    );
}
