import EditorView from '@/view/editor/EditorView';
import Logo from '@/view/logo/Logo';
import NavAside from '@/view/nav/NavAside';
import React from 'react';
import '@/assets/style/style.scss';

function App(props) {
    return (
        <div className="app container">
            <NavAside />
            <Logo />
            <EditorView />
        </div>
    );
}

export default App;