import React from 'react';

export default function DetailedViewNav(props) {
    return (
        <div className="detailed-view-nav w-100p">
            <div
                style={{
                    position: 'absolute',
                    bottom: '60px'
                }}
            >
                <a className="d-inb fs-17 p-20">
                    + Add subcards...
                </a>
            </div>
            <div style={{
                position: 'absolute',
                width: '500px',
                height: '54vh',
                background: '#fff',
                right: '85%',
                top: 'calc(50% - 21vh)',
                opacity: 0.4
            }} />
            <div style={{
                position: 'absolute',
                width: '500px',
                height: '54vh',
                background: '#fff',
                left: '85%',
                top: 'calc(50% - 21vh)',
                opacity: 0.4
            }} />
        </div>
    );
}
