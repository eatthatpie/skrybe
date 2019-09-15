import PopupDashboard from '@/view/popup/PopupDashboard';
import PopupSignIn from '@/view/popup/PopupSignIn';
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { togglePopup } from '@/actions/index';
import './Popup.scss';

// @TODO
// This is pretty hardcoded for now. Change that.
// Also this need refactoring.
function Popup(props) {
    let contentView;

    function signInWithFacebook() {
        props.auth
            .signInWithFacebookPopup()
            .then(() => {
                props.togglePopup({ isActive: false });
                props.handleAuthStateChange();
            });
    }

    function signInWithGoogle() {
        props.auth
            .signInWithGooglePopup()
            .then(() => {
                props.togglePopup({ isActive: false });
                props.handleAuthStateChange();
            });
    }

    if (props.popupData.type === 'sign-in') {
        contentView = (
            <PopupSignIn
                {...props}
                signInWithFacebookFunc={signInWithFacebook}
                signInWithGoogleFunc={signInWithGoogle}
            />
        );
    } else {
        contentView = <PopupDashboard {...props} />;
    }

    return (
        <div className={
            `popup fixed cover z-1100 bg-light ${props.popupData.isActive ? 'is-active' : ''}`
        }>
            {contentView}
        </div>
    );
}

const stateToProps = function(state) {
    return ({
        popupData: state.view.popup
    });
};

const dispatchToProps = function(dispatch) {
    return {
        togglePopup({ isActive, type }) {
            dispatch(togglePopup({ isActivePopup: isActive, popupType: type }));
        }
    };
};

export default connect(stateToProps, dispatchToProps)(Popup);
