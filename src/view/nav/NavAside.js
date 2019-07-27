import React from 'react';
import { connect } from 'react-redux';
import { navToggle } from '@/actions/index';
import './NavAside.scss';

function NavAside(props) {
    const itemsView = Object.keys(props.nav).map(navName => {
        const nav = props.nav[navName];

        const childrenView = (
            <ol className="list">
                {nav.items.map(item => (
                    <li className="bg-nav-i bc-bg h:bg-nav-ic">
                        <a>
                            {item.label}
                            <small className="color-light fs-9">{item.desc}</small>
                        </a>
                    </li>
                ))}
            </ol>
        );

        return (
            <li className={nav.isActive ? 'is-active' : ''}>
                <a
                    className="h:color-primary fs-16"
                    data-nav-name={navName}
                    onClick={handleClick}
                >
                    <i className="fas fa-caret-right"></i> {nav.name}
                </a>
                {nav.isActive ? childrenView : ''}
            </li>
        );
    });

    return (
        <nav className="nav-aside bg-light">
            <ul className="list">
                {itemsView}
            </ul>
        </nav>
    );

    function handleClick(e) {
        const { dispatch } = props;
        const name = e.target.getAttribute('data-nav-name');

        dispatch(navToggle({ name }));
    }
}

export default connect(state => ({
    nav: state.nav
}))(NavAside);