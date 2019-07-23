import EditorView from '@/view/editor/EditorView';
import logo from '@/assets/images/logo.svg';
import NavAside from '@/view/nav/NavAside';
import React from 'react';
import '@/assets/style/style.scss';

const styles = {
    logo: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        width: '128px',
        backgroundColor: 'rgb(49, 152, 105)',
        zIndex: 1000
    }
}

function App(props) {
    return (
        <div className="app container">
            <NavAside />
            <img src={logo} style={styles.logo} />
            <EditorView />
        </div>
    );
}

export default App;