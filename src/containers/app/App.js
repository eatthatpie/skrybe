import EditorContainer from '@/containers/editor/EditorContainer';
import LayoutMaskContainer from '@/containers/layout/LayoutMaskContainer';
import Logo from '@/view/logo/Logo';
import NavContainer from '@/containers/nav/NavContainer';
import NavMobileContainer from '@/containers/nav/NavMobileContainer'
import PopupContainer from '@/containers/popup/PopupContainer';
import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { AuthContext } from '@/services/auth';
import { DatabaseContext } from '@/services/database';
import {
    dangerouslyResetOutlineTree,
    toggleLayoutOverlay,
    togglePopup
} from '@/actions';
import '@/assets/style/style.scss';
import './App.scss';

function App(props) {
    const auth = useContext(AuthContext);
    const database = useContext(DatabaseContext);

    const [isAuth, setIsAuth] = useState(auth.isAuth);

    auth.onAuthStateChanged(user => {
        if (user) {
            auth.setIsAuth(true);
            setIsAuth(true);

            props.togglePopup({ isActive: false });

            handleAuthStateChange();
        }
    });

    function handleSignOut() {
        auth.signOut().then(() => {
            window.location.href = '/';
        })
    }

    function handleAuthStateChange() {
        props.toggleLayoutOverlay({ isActive: true });

        database
            .fetch(`/user/${auth.getCurrentUserId()}/project/test-project`)
            .then(snapshot => {
                if (snapshot.val()) {
                    props.dangerouslyResetOutlineTree(snapshot.val());
                }

                props.toggleLayoutOverlay({ isActive: false });
            });
    }

    return (
        <div className="app container">
            <NavMobileContainer />
            <NavContainer
                isAuth={isAuth}
                handleSignOut={handleSignOut}
            />
            <Logo />
            <EditorContainer
                database={database}
                auth={auth}
            />
            <LayoutMaskContainer />
            <PopupContainer
                auth={auth}
                handleAuthStateChange={handleAuthStateChange}
            />
        </div>
    );
}

const stateToProps = function(state) {
    return ({});
};

const dispatchToProps = function(dispatch) {
    return {
        dangerouslyResetOutlineTree(outlineTree) {
            dispatch(dangerouslyResetOutlineTree(outlineTree));
        },
        toggleLayoutOverlay({ isActive }) {
            dispatch(toggleLayoutOverlay({ isLayoutOverlayActive: isActive }));
        },
        togglePopup({ isActive, type }) {
            dispatch(togglePopup({ isActivePopup: isActive, popupType: type }));
        }
    };
};

export default connect(stateToProps, dispatchToProps)(App);
