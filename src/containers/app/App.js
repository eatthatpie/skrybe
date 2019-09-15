import EditorContainer from '@/containers/editor/EditorContainer';
import Logo from '@/view/logo/Logo';
import NavContainer from '@/containers/nav/NavContainer';
import NavMobileContainer from '@/containers/nav/NavMobileContainer'
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { DatabaseContext } from '@/services/database';
import { dangerouslyResetOutlineTree } from '@/actions';
import '@/assets/style/style.scss';
import './App.scss';

function App(props) {
    const database = useContext(DatabaseContext);

    database.fetch('/user/testuser/project/test-project').then(snapshot => {
        props.dangerouslyResetOutlineTree(snapshot.val());
    });

    return (
        <div className="app container">
            <NavMobileContainer />
            <NavContainer />
            <Logo />
            <EditorContainer database={database} />
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
        }
    };
};

export default connect(stateToProps, dispatchToProps)(App);
