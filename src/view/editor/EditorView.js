import ButtonCircle from '@/view/button/ButtonCircle';
import Card from '@/view/card/Card';
import CardGhost from '@/view/card/CardGhost';
import React from 'react';
import './EditorView.scss';

class EditorView extends React.Component {
    constructor(props) {
        super();

        this.state = {
            leadText: props.currentNode.leadText || '',
            bodyText: props.currentNode.bodyText || ''
        }

        this.handleChangeLeadText = this.handleChangeLeadText.bind(this);
        this.handleChangeBodyText = this.handleChangeBodyText.bind(this);
        this.onClickNavigateUp = this.onClickNavigateUp.bind(this);
        this.onClickNavigateDown = this.onClickNavigateDown.bind(this);
        this.onClickNavigateLeft = this.onClickNavigateLeft.bind(this);
        this.onClickNavigateRight = this.onClickNavigateRight.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.outlineTree.currentNodeId != this.props.outlineTree.currentNodeId) {
            this.setState({
                bodyText: this.props.currentNode.bodyText,
                leadText: this.props.currentNode.leadText
            });
        }

        return true;
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

    onClickNavigateUp() {
        this.props.moveUp();
    }

    onClickNavigateDown() {
        this.props.moveDown();
    }

    onClickNavigateLeft() {
        this.props.moveLeft();
    }

    onClickNavigateRight() {
        this.props.moveRight();
    }
    
    render() {
        return (
            <div className="editor-view flex">
                <CardGhost
                    className="to-top"
                    iconClassName="angle-up"
                    onClick={this.onClickNavigateUp}
                />
                <CardGhost
                    className="to-bottom"
                    iconClassName="angle-down"
                    onClick={this.onClickNavigateDown}
                />
                <CardGhost
                    className="to-left"
                    iconClassName="angle-left"
                    onClick={this.onClickNavigateLeft}
                />
                <CardGhost
                    className="to-right"
                    iconClassName="angle-right"
                    onClick={this.onClickNavigateRight}
                />
                <Card
                    leadText={this.props.currentNode.leadText}
                    bodyText={this.props.currentNode.bodyText}
                    handleChangeLeadText={this.handleChangeLeadText}
                    handleChangeBodyText={this.handleChangeBodyText}
                />
                <ButtonCircle
                    iconClassName="fas fa-plus"
                    handleClick={() => {
                        this.props.insertCard({
                            parentNodeId: this.props.parentNodeId,
                            leadText: '',
                            bodyText: ''
                        });
                    }}
                />
                <ButtonCircle
                    iconClassName="fas fa-check"
                    handleClick={() => {
                        this.props.updateCard({
                            nodeId: this.props.outlineTree.currentNodeId,
                            leadText: this.state.leadText,
                            bodyText: this.state.bodyText
                        });
                    }}
                />
            </div>
        );
    }
}

export default EditorView;