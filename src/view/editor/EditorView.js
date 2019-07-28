import Card from '@/view/card/Card';
import React from 'react';
import './EditorView.scss';

class EditorView extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <div className="editor-view flex">
                <Card leadText={this.props.outlineTree.root.leadText} />
            </div>
        );
    }
}

export default EditorView;