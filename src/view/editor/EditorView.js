import ButtonCircle from '@/view/button/ButtonCircle';
import Card from '@/view/card/Card';
import CardGhost from '@/view/card/CardGhost';
import React from 'react';
import './EditorView.scss';

class EditorView extends React.Component {
    constructor(props) {
        super();

        this.rootChildPlaceholder = `Write a very short brief of your story. Try to mention its all main parts. For example: After breaking up with his girlfriend, John moves to a big city to forget about her. He decides to live in an unusual apartment -- the back room of the popular pub. He meets many new and strange people there.`
        this.rootPlaceholder = `For example: The main character -- JOHN -- writes a book that eventually destroys him.`;

        let cardPlaceholder = null;
        if (props.outlineTree.currentNodeId === 'root') {
            cardPlaceholder = this.rootPlaceholder;
        } else if(props.parentNodeId === 'root') {
            cardPlaceholder = this.rootChildPlaceholder;
        }

        this.state = {
            leadText: props.currentNode.leadText || '',
            bodyText: props.currentNode.bodyText || '',
            cardPlaceholder
        }

        this.findCharacterNames = this.findCharacterNames.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChangeLeadText = this.handleChangeLeadText.bind(this);
        this.handleChangeBodyText = this.handleChangeBodyText.bind(this);
        this.onClickNavigateUp = this.onClickNavigateUp.bind(this);
        this.onClickNavigateDown = this.onClickNavigateDown.bind(this);
        this.onClickNavigateLeft = this.onClickNavigateLeft.bind(this);
        this.onClickNavigateRight = this.onClickNavigateRight.bind(this);

        this.cardRef = React.createRef();
    }

    componentDidMount() {
        this.cardRef.current.focus();
    }

    shouldComponentUpdate(nextProps) {
        if (
            nextProps.outlineTree.currentNodeId !== this.props.outlineTree.currentNodeId
        ) {
            let cardPlaceholder = null;

            if (nextProps.outlineTree.currentNodeId === 'root') {
                cardPlaceholder = this.rootPlaceholder;
            } else if(nextProps.parentNodeId === 'root') {
                cardPlaceholder = this.rootChildPlaceholder;
            }

            this.setState({
                bodyText: nextProps.currentNode.bodyText,
                leadText: nextProps.currentNode.leadText,
                cardPlaceholder
            });

            this.cardRef.current.focus();
        }

        return true;
    }

    handleSave() {
        this.props.updateCard({
            nodeId: this.props.outlineTree.currentNodeId,
            leadText: this.state.leadText,
            bodyText: this.state.bodyText
        });

        const characterNames = this.findCharacterNames();

        this.props.updateCharacters({
            nodeId: this.props.outlineTree.currentNodeId,
            characterNames
        });
    }

    findCharacterNames() {
        const characterNameRegex = /[A-Z]{2,}-?\s?[A-Z]+/g;
        const names = [].concat(
            this.state.bodyText.match(characterNameRegex),
            this.state.leadText.match(characterNameRegex)
        );

        return Array.from(new Set(names.filter(item => !!item)));
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
                    leadText={this.state.leadText}
                    bodyText={this.state.bodyText}
                    handleChangeLeadText={this.handleChangeLeadText}
                    handleChangeBodyText={this.handleChangeBodyText}
                    placeholder={this.state.cardPlaceholder}
                    ref={this.cardRef}
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
                    handleClick={this.handleSave}
                />
            </div>
        );
    }
}

export default EditorView;