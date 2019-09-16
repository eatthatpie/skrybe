import React, { useContext } from 'react';
import Spinner from '@/view/spinner/Spinner';
import { connect } from 'react-redux';
import './LayoutMask.scss';

function LayoutMask(props) {
    return (
        <div className={
            `layout-mask flex ${props.isLayoutOverlayActive ? 'is-active' : ''}`
        }>
            <Spinner />
        </div>
    );
}

const stateToProps = function(state) {
    return ({
        isLayoutOverlayActive: state.view.isLayoutOverlayActive
    });
};

const dispatchToProps = function(dispatch) {
    return {};
};

export default connect(stateToProps, dispatchToProps)(LayoutMask);
