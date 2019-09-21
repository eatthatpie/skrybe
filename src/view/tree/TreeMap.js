import React, { useEffect, useState } from 'react';
import './TreeMap.scss';

export default function Map({ data }) {
    let tooltips = [];

    function tooltip(x, y, text) {
        if (!text) {
            return null;
        }

        const width = 280 / currentScale;
        const height = 32 / currentScale;

        return (
            <g className="tt">
                <rect
                    x={x - (width / 2)}
                    y={y - height - (23 / currentScale)}
                    width={width}
                    height={height}
                    fill="#ffffffee"
                    rx={height / 2}
                    ry={height / 2}
                />
                <polygon
                    points={`${x - (8 / currentScale)},${y - (24 / currentScale)} ${x + (9 / currentScale)},${y - (24 / currentScale)} ${x},${y - (16 / currentScale)}`}
                    fill="#ffffffee"
                />
                <text
                    textAnchor="middle"
                    x={x}
                    y={y - height - (3 / currentScale)}
                    fill="#000"
                    style={{ fontSize: `${12 / currentScale}px` }}
                >
                    {text}
                </text>
            </g>
        );
    }

    function circle(key, x, y, className, handleClick) {
        const radius = 8 / currentScale;

        return (
            <g
                className={`bullet ${className}`}
                onMouseOver={() => { setCurrentBulletHovered(key) }}
                onMouseOut={() => { setCurrentBulletHovered(null) }}
                onClick={handleClick}
            >
                <circle
                    cx={x}
                    cy={y}
                    r={radius}
                    fill="#319869"
                    stroke="white"
                    strokeWidth={2 / currentScale}
                    style={{ transformOrigin: `${x}px ${y}px`}}
                />
                <circle
                    cx={x}
                    cy={y}
                    r={radius * 2}
                    fill="#fff"
                    strokeWidth="0"
                    style={{ transformOrigin: `${x}px ${y}px`}}
                />
            </g>
        );
    }

    function drawMapItem(key, level, left, right, parentX) {
        const item = data[key];
        const pointx = (right + left) / 2;
        const stepY = 40;
        const className = item.className || '';

        let out = [circle(key, pointx, stepY * level, className, item.handleClick)];

        tooltips.push({
            key,
            view: tooltip(pointx, stepY * level, item.text)
        });

        if (key !== 'root') {
            out.push(
                <g>
                    <path
                        d={
                            `
                                M ${parentX} ${stepY * (level - 1) + (8 / currentScale)}
                                C ${parentX} ${stepY * (level - 0.5)},
                                ${pointx} ${stepY * (level - 1)},
                                ${pointx} ${stepY * level - (8 / currentScale)}
                            `
                        }
                        stroke="white"
                        strokeWidth={2 / currentScale}
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

    function handleDragStart(e) {
        const x = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
        const y = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;

        setMouse({ x, y });
        setIsDragging(true);
    }

    function handleDragEnd(e) {
        const x = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
        const y = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;

        setMouse({ x, y });
        setIsDragging(false);

        setOrigin({
            x: x - currentTranslate.x,
            y: y - currentTranslate.y
        });
    }

    function handleDragMove(e) {
        const x = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
        const y = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
        const dx = currentMouse.x - x;
        const dy = currentMouse.y - y;

        if (isDragging) {
            const translateX = currentTranslate.x - dx;
            const translateY = currentTranslate.y - dy;

            const originX = currentOrigin.x;
            const originY = currentOrigin.y;

            setTranslate({
                x: translateX,
                y: translateY
            });

            setOrigin({
                x: originX,
                y: originY
            });

            setStyle({
                transformOrigin: `${originX}px ${originY}px`,
                transform: `translate(${translateX}px, ${translateY}px) scale(${currentScale})`
            });

            setMouse({ x, y });
        }
    }

    function handleWheel(e) {
        const dMouseX = e.clientX - currentMouse.x;
        const dMouseY = e.clientY - currentMouse.y;

        const originX = currentOrigin.x + (dMouseX / currentScale);
        const originY = currentOrigin.y + (dMouseY / currentScale);

        const translateX = e.clientX - originX;
        const translateY = e.clientY - originY;

        let scale = currentScale;

        if (e.deltaY > 0) {
            if (currentScale > 0.5) {
                scale = currentScale - 0.2;
            }
        } else if (e.deltaY !== null && e.deltaY !== undefined) {
            if (currentScale < 3) {
                scale = currentScale + 0.2;
            }
        }

        setOrigin({
            x: originX,
            y: originY
        });

        setTranslate({
            x: translateX,
            y: translateY
        });

        setScale(scale);

        setStyle({
            transformOrigin: `${originX}px ${originY}px`,
            transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`
        });

        setMouse({ x: e.clientX, y: e.clientY });
    }

    const [currentBulletHovered, setCurrentBulletHovered] = useState(null);

    const [isDragging, setIsDragging] = useState(false);

    const [currentScale, setScale] = useState(1);

    const [currentOrigin, setOrigin] = useState({ x: 0, y: 0 });

    const [currentMouse, setMouse] = useState({ x: 0, y: 0 });

    const [currentTranslate, setTranslate] = useState({ x: 0, y: 0 });

    const [gStyle, setStyle] = useState({
        transformOrigin: `${currentOrigin.x}px ${currentOrigin.y}px`,
        transform: `translate(${currentTranslate.x}px, ${currentTranslate.y}px) scale(${currentScale})`
    });

    useEffect(() => {
        const windowWidth = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;

        const windowHeight = window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;

        const y = (windowHeight - 80) / 2;

        setTranslate({
            x: (windowWidth - 800) / 2,
            y: y
        });

        setStyle({
            transformOrigin: `${currentTranslate.x}px ${currentTranslate.y}px`,
            transform: `translate(${(windowWidth - 800) / 2}px, ${y}px) scale(${currentScale})`
        });
    }, [null]);

    return (
        <svg
            height="100%"
            width="100%"
            className="tree-map"
            onWheel={handleWheel}
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onMouseMove={handleDragMove}
        >
            <defs>
                <linearGradient id="fade" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: `#282c34`, stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: `#282c34`, stopOpacity: 0 }} />
                </linearGradient>
                <linearGradient id="fade-reverse" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: `#282c34`, stopOpacity: 0 }} />
                    <stop offset="100%" style={{ stopColor: `#282c34`, stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <g style={gStyle}>
                {drawMapItem('root', 1, 0, 800)}
                {tooltips.map(item => {
                    return (
                        <g className={item.key === currentBulletHovered ? 'tt-container is-active' : 'tt-container'}>
                            {item.view}
                        </g>
                    )
                })}
            </g>
            <rect
                x="0"
                y="0"
                width="150"
                height="100%"
                fill="url(#fade)"
            />
            <rect
                x="calc(100% - 150px)"
                y="0"
                width="150"
                height="100%"
                fill="url(#fade-reverse)"
            />
        </svg>
    );
}
