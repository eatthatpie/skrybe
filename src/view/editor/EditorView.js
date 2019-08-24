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

        this.handleChangeLeadText = this.handleChangeLeadText.bind(this);
        this.handleChangeBodyText = this.handleChangeBodyText.bind(this);
    }

    handleChangeLeadText(e) {
        const value = e.target.value;

        this.setState({
            leadText: value
        });
    }

    handleChangeBodyText(e) {
        const value = e.target.value;

        this.setState({
            bodyText: value
        });
    }
    
    render() {
        return (
            <div className="editor-view flex">
                <Card
                    leadText={this.props.currentNode.leadText}
                    bodyText={this.props.currentNode.bodyText}
                    handleChangeLeadText={this.handleChangeLeadText}
                    handleChangeBodyText={this.handleChangeBodyText}
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