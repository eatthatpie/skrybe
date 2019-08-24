import ButtonCircle from '@/view/button/ButtonCircle';
import Card from '@/view/card/Card';
import React from 'react';
import './EditorView.scss';

class EditorView extends React.Component {
    constructor(props) {
        super();

        this.state = {
            leadText: props.currentNode.leadText,
            bodyText: props.currentNode.bodyText || 'test.'
        }
    }
    
    render() {
        return (
            <div className="editor-view flex">
                <Card
                    leadText={this.props.currentNode.leadText}
                    bodyText={this.props.currentNode.bodyText}
                />
                <ButtonCircle handleClick={() => {
                    this.props.updateCard({
                        nodeId: this.props.currentNodeId,
                        leadText: this.state.leadText,
                        bodyText: this.state.bodyText
                    });
                }} />
            </div>
        );
    }
}

export default EditorView;