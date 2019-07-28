import Card from '@/view/card/Card';
import React from 'react';
import './EditorView.scss';

function EditorView(props) {
    return (
        <div className="editor-view flex">
            <Card leadText={props.outlineTree.root.leadText} />
        </div>
    );
}

export default EditorView;