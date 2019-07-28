import EditorContainer from '@/containers/editor/EditorContainer';
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
            <EditorContainer />
        </div>
    );
}

export default App;