import React, { useEffect, useState } from 'react';
import './TreeMap.scss';

export default function Map({ data }) {
    let tooltips = [];

    function tooltip(x, y, text) {
        if (!text) {
            return null;
        }
        
        const shortenedText = text.substring(0, 88);

        const width = 280 / currentScale;
        const height = 40 / currentScale;

        let textRender;

        if (shortenedText.length > 50) {
            textRender = (
                <React.Fragment>
                    <text
                        textAnchor="middle"
                        x={x}
                        y={y - height + (1 / currentScale) - (8 / currentScale)}
                        fill="#000"
                        style={{ fontSize: `${12 / currentScale}px` }}
                    >
                        {shortenedText.substring(0, 44)}
                    </text>
                    <text
                        textAnchor="middle"
                        x={x}
                        y={y - height + (1 / currentScale) + (8 / currentScale)}
                        fill="#000"
                        style={{ fontSize: `${12 / currentScale}px` }}
                    >
                        {shortenedText.substring(44, 88)}{text.length > 88 ? '...' : ''}
                    </text>
                </React.Fragment>
            );
        } else {
            textRender = (
                <text
                    textAnchor="middle"
                    x={x}
                    y={y - height + (1 / currentScale)}
                    fill="#000"
                    style={{ fontSize: `${12 / currentScale}px` }}
                >
                    {shortenedText}
                </text>
            );
        }

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
                {textRender}
            </g>
        );
    }

    function circle(key, x, y, className, handleClick) {
        const radius = 8 / currentScale;

        function handleClickFunc(e) {
            if (window.innerWidth <= 1024) {
                if (currentBulletHovered === key) {
                    handleClick(e);
                } else {
                    setCurrentBulletHovered(key)
                }
            } else {
                handleClick(e);
            }
        }

        return (
            <g
                className={`bullet ${className}`}
                onMouseOver={() => { if (window.innerWidth > 1024) setCurrentBulletHovered(key) }}
                onMouseOut={() => { setCurrentBulletHovered(null) }}
                onClick={handleClickFunc}
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
        let className = item.className || '';

        if (item.isEmpty) {
            className += ' is-empty';
        }

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

        setLastAction({ type: 'drag', params: { x, y } });

        setTouchesDistance(null);
    }

    function handleDragMove(e) {
        if (e.changedTouches && e.changedTouches.length === 2) {
            const x1 = e.changedTouches[0].pageX;
            const y1 = e.changedTouches[0].pageY;
            const x2 = e.changedTouches[1].pageX;
            const y2 = e.changedTouches[1].pageY;

            const distanceX = Math.abs(x1 - x2);
            const distanceY = Math.abs(y1 - y2);

            const currentDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (touchesDistance !== null) {
                zoom({
                    clientX: (x1 + x2) / 2,
                    clientY: (y1 + y2) / 2,
                    deltaY: currentDistance < touchesDistance,
                    zoomFactor: Math.abs(currentDistance - touchesDistance) / 150
                });
            }

            setTouchesDistance(currentDistance);

            return;
        }

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
        zoom({
            clientX: e.clientX,
            clientY: e.clientY,
            deltaY: e.deltaY
        });
    }

    function zoom({ clientX, clientY, deltaY, zoomFactor }) {
        const dMouseX = clientX - currentMouse.x;
        const dMouseY = clientY - currentMouse.y;

        let originX = currentOrigin.x + (dMouseX / currentScale);
        let originY = currentOrigin.y + (dMouseY / currentScale);

        if (lastAction && lastAction.type === 'drag') {
            setLastAction({ type: 'wheel', params: null });

            const dtox = (currentOrigin.x + currentTranslate.x) - currentOrigin.x * currentScale;
            const dtoy = (currentOrigin.y + currentTranslate.y) - currentOrigin.y * currentScale;

            originX = (clientX - dtox) / currentScale;
            originY = (clientY - dtoy) / currentScale;
        }

        const translateX = clientX - originX;
        const translateY = clientY - originY;

        let scale = currentScale;

        zoomFactor = zoomFactor || 0.2;

        if (deltaY > 0) {
            if (currentScale > 0.5) {
                scale = currentScale - zoomFactor;
            }
        } else if (deltaY !== null && deltaY !== undefined) {
            if (currentScale < 5) {
                scale = currentScale + zoomFactor;
            } else if (currentScale < 7) {
                scale = currentScale + zoomFactor * 2.5;
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

        setMouse({ x: clientX, y: clientY });
    }

    const [lastAction, setLastAction] = useState({ type: 'drag', params: { x: 0, y: 0 } });

    const [currentBulletHovered, setCurrentBulletHovered] = useState(null);

    const [touchesDistance, setTouchesDistance] = useState(null);

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
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
            onTouchMove={handleDragMove}
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
                className="gradient-shadow"
            />
            <rect
                x="calc(100% - 150px)"
                y="0"
                width="150"
                height="100%"
                fill="url(#fade-reverse)"
                className="gradient-shadow"
            />
        </svg>
    );
}
