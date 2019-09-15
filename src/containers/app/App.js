import EditorContainer from '@/containers/editor/EditorContainer';
import Logo from '@/view/logo/Logo';
import NavContainer from '@/containers/nav/NavContainer';
import NavMobileContainer from '@/containers/nav/NavMobileContainer'
import React from 'react';
import '@/assets/style/style.scss';
import './App.scss';

// https://fontawesome.com/icons/sticky-note?style=solid
// https://www.iconfinder.com/icons/2672445/binary_data_diversity_tree_icon

// @FIXME: this should be a view, not a container
function App() {
    return (
        <div className="app container">
            <NavMobileContainer />
            <NavContainer />
            <Logo />
            <EditorContainer />
        </div>
    );
}

export default App;