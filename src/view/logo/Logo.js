import logo from '@/assets/images/logo.svg';
import React from 'react';
import './Logo.scss';

function Logo(props) {
    return (
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>
    );
}

export default Logo;