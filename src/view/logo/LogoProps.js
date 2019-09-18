import React from 'react';
import './LogoProps.scss';

function Logo() {
    return (
        <div className="logo-props">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500">
                <path
                    d="M245 160 L110 360"
                    stroke="#fff"
                    strokeWidth="20"
                    strokeLinecap="round"
                    className="p1"
                />
                <path
                    d="M300 140 L300 360"
                    stroke="#fff"
                    strokeWidth="20"
                    strokeLinecap="round"
                    className="p2"
                />
                <path
                    d="M355 160 L490 360"
                    stroke="#fff"
                    strokeWidth="20"
                    strokeLinecap="round"
                    className="p3"
                />
                <circle
                    cx="300"
                    cy="80"
                    r="60"
                    stroke="#fff"
                    strokeWidth="20"
                    fill="transparent"
                    className="ct"
                />
                <circle
                    cx="80"
                    cy="420"
                    r="60"
                    stroke="#fff"
                    strokeWidth="20"
                    fill="transparent"
                    className="cb1"
                />
                <circle
                    cx="300"
                    cy="420"
                    r="60"
                    stroke="#fff"
                    strokeWidth="20"
                    fill="transparent"
                    className="cb2"
                />
                <circle
                    cx="520"
                    cy="420"
                    r="60"
                    stroke="#fff"
                    strokeWidth="20"
                    fill="transparent"
                    className="cb3"
                />
            </svg>
        </div>
    );
}

export default Logo;