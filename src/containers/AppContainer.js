import EditorContainer from '@/containers/EditorContainer';
import NavContainer from '@/containers/NavContainer';
import React, { useContext, useEffect, useState } from 'react';
import Toolbar from '@/view/toolbar/Toolbar';
import { connect } from 'react-redux';
import { AuthContext } from '@/services/auth';
import { DatabaseContext } from '@/services/database';
import {
    dangerouslyResetOutlineTree,
    toggleLayoutOverlay
} from '@/actions';
import {
    caseTogglePopupDTP,
    caseToggleTreeModeDTP
} from '@/containers/dtp';
import { objectMerge } from '@/helpers';
import '@/assets/style/style.scss';

function App(props) {
    const auth = useContext(AuthContext);
    const database = useContext(DatabaseContext);

    const [isAuth, setIsAuth] = useState(auth.isAuth());
    const [currentUserId, setCurrentUserId] = useState(auth.getCurrentUserId());

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, [handleKeyUp]);

    useEffect(() => {
        const offlineStoredOutlineTree = localStorage.getItem('skrybe:osot');

        if (!!offlineStoredOutlineTree) {
            props.dangerouslyResetOutlineTree(
                JSON.parse(offlineStoredOutlineTree)
            );

            props.togglePopup({ isActive: false });
        }
    }, [null]);

    useEffect(() => {
        if (isAuth) {
            setCurrentUserId(auth.getCurrentUserId());
        }
    }, [isAuth]);

    useEffect(() => {
        if (isAuth) {
            props.togglePopup({ isActive: false });

            handleAuthStateChange();
        }
    }, [currentUserId])

    auth.onAuthStateChanged(isAuth => {
        setIsAuth(isAuth);
    });

    function handleSignOut() {
        auth.signOut().then(() => {
            window.location.href = '/';
        })
    }

    function handleAuthStateChange() {
        props.toggleLayoutOverlay({ isActive: true });

        const uid = currentUserId || auth.getCurrentUserId();

        database
            .fetch(`/user/${uid}/project/test-project`)
            .then(snapshot => {
                if (snapshot.val()) {
                    props.dangerouslyResetOutlineTree(snapshot.val());
                } else {
                    props.dangerouslyResetOutlineTree(props.savedOutlineTree);

                    database.set(
                        `/user/${uid}/project/test-project`,
                        props.savedOutlineTree
                    );
                }

                localStorage.removeItem('skrybe:osot');
            })
            .finally(() => {
                props.toggleLayoutOverlay({ isActive: false });
            });
    }

    function handleKeyUp(e) {
        if (e.code === 'Escape') {
            props.toggleTreeMode({ isTreeMode: !props.isTreeMode });
        }
    }

    return (
        <div className="app container h-100p theme-sea">
            <div className="bg color-default h-100p">
                <Toolbar />
                <NavContainer
                    isAuth={isAuth}
                    handleSignOut={handleSignOut}
                />
                <EditorContainer
                    database={database}
                    currentUserId={currentUserId}
                    isAuth={isAuth}
                />
            </div>
        </div>
    );
}

const stateToProps = function(state) {
    return ({
        savedOutlineTree: state.outlineTree,
        isTreeMode: state.mode.isTreeMode
    });
};

const dispatchToProps = function(dispatch) {
    return objectMerge(
        caseTogglePopupDTP(dispatch),
        caseToggleTreeModeDTP(dispatch),
        {
            dangerouslyResetOutlineTree(outlineTree) {
                dispatch(dangerouslyResetOutlineTree(outlineTree));
            },
            toggleLayoutOverlay({ isActive }) {
                dispatch(toggleLayoutOverlay({ isLayoutOverlayActive: isActive }));
            }
        }
    );
};

export default connect(stateToProps, dispatchToProps)(App);
