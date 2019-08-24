import ButtonCircle from '@/view/button/ButtonCircle';
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
                <Card
                    leadText={this.props.currentNode.leadText}
                    bodyText={this.props.currentNode.bodyText}
                />
                <ButtonCircle handleClick={() => {
                    this.props.updateCard({ nodeId: 'root', leadText: 'text' })
                }} />
            </div>
        );
    }
}

export default EditorView;