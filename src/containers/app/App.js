import EditorView from '@/view/editor/EditorView';
import Logo from '@/view/logo/Logo';
import NavContainer from '@/containers/nav/NavContainer';
import React from 'react';
import '@/assets/style/style.scss';
import './App.scss';

function App() {
    return (
        <div className="app container">
            <NavContainer />
            <Logo />
            <EditorView />
        </div>
    );
}

export default App;