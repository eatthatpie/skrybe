import Card from '@/view/card/Card';
import CardGhost from '@/view/card/CardGhost';
import EditorControls from '@/view/editor/EditorControls';
import TreeView from '@/view/tree/TreeView';
import TreeViewToggler from '@/view/tree/TreeViewToggler';
import React from 'react';
import './EditorView.scss';

// @TODO: refactor. This class is way too big.
// Make sth like policies, what controls show in what circumstances, what
// action to perform, etc.
class EditorView extends React.Component {
    constructor(props) {
        super();

        this.rootChildPlaceholder = `
            Write a very short brief of your story. Try to mention its all main parts. For example: After breaking up with his girlfriend, John moves to a big city to forget about her. He decides to live in an unusual apartment...
        `
        this.rootPlaceholder = `
            For example: The main character -- JOHN -- writes a book that eventually destroys him.
        `;

        let cardPlaceholder = null;
        if (props.outlineTree.currentNodeId === 'root') {
            cardPlaceholder = this.rootPlaceholder;
        } else if(props.parentNodeId === 'root') {
            cardPlaceholder = this.rootChildPlaceholder;
        }

        this.state = {
            leadText: props.currentNode.leadText || '',
            bodyText: props.currentNode.bodyText || '',
            cardPlaceholder,
            shouldGainFocusOnUpdate: false
        }

        this.findCharacterNames = this.findCharacterNames.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDiscard = this.handleDiscard.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChangeLeadText = this.handleChangeLeadText.bind(this);
        this.handleChangeBodyText = this.handleChangeBodyText.bind(this);
        this.handleCardFocus = this.handleCardFocus.bind(this);
        this.handleCardBlur = this.handleCardBlur.bind(this);

        this.isAllowedToAddSiblings = this.isAllowedToAddSiblings.bind(this);

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

            if (this.state.shouldGainFocusOnUpdate) {
                this.cardRef.current.focus();

                this.setState({
                    shouldGainFocusOnUpdate: false
                });
            }
        }

        return true;
    }

    handleEdit() {
        if (this.cardRef.current) {
            this.cardRef.current.focus();
        }
    }

    handleDiscard() {
        this.setState({
            leadText: this.props.currentNode.leadText || '',
            bodyText: this.props.currentNode.bodyText || ''
        });

        if (this.cardRef.current) {
            this.cardRef.current.blur();
        }
    }

    handleAdd() {
        if (!this.isAllowedToAddSiblings()) {
            return;
        }

        this.props.insertCard({
            parentNodeId: this.props.parentNodeId,
            leadText: '',
            bodyText: ''
        });
    }

    handleSave() {
        this.setState({
            shouldGainFocusOnUpdate: true
        });

        setTimeout(() => {
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
        }, 1)
    }

    findCharacterNames() {
        // English and Polish names are supoorted for now.
        const characterNameRegex = /[A-ZŻŁĆĘŚĄŹŃ]{2,}-?\s?[A-ZŻÓŁĆĘŚĄŹŃ]+/gu;
        const names = [].concat(
            this.state.bodyText.match(characterNameRegex),
            this.state.leadText.match(characterNameRegex)
        );

        return Array.from(new Set(names.filter(item => !!item)));
    }

    isAllowedToAddSiblings() {
        return (
            this.props.parentNodeId !== 'root' &&
            this.props.outlineTree.currentNodeId !== 'root'
        );
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

    handleCardFocus() {
        setTimeout(() => {
            this.props.toggleEditMode({ isEditMode: true });
        }, 200);
    }

    handleCardBlur() {
        setTimeout(() => {
            this.props.toggleEditMode({ isEditMode: false });
        }, 200);
    }
    
    render() {
        return (
            <div className={
                `editor-view ${this.props.isTreeMode ? 'is-tree-view' : ''} ${this.props.isEditMode ? 'is-edit-mode' : ''}`
            }>
                <EditorControls
                    hideAllIf={this.props.isTreeMode}
                    className="editor-controls--mobile flex flex-normal flex-sb fixed cover-top h-60 bg-black z-550 ph-15 st:ph-0"
                    controls={{
                        save: {
                            visibleIf: this.props.isEditMode,
                            handleClick: this.handleSave.bind(this)
                        },
                        discard: {
                            visibleIf: this.props.isEditMode,
                            handleClick: this.handleDiscard.bind(this)
                        }
                    }}
                />
                <TreeViewToggler
                    className={`z-550 ${this.props.isTreeMode ? 'is-tree-mode' : ''}`}
                    handleClick={() => { this.props.toggleTreeMode({ isTreeMode: !this.props.isTreeMode }) }}
                    title="Toggle story tree view"
                />
                <div className="card-view flex h-100p">
                    <CardGhost
                        className="to-top"
                        iconClassName="angle-up"
                        onClick={this.props.moveUp}
                    />
                    <CardGhost
                        className="to-bottom"
                        iconClassName="angle-down"
                        onClick={this.props.moveDown}
                    />
                    <CardGhost
                        className="to-left"
                        iconClassName="angle-left"
                        onClick={this.props.moveLeft}
                    />
                    <CardGhost
                        className="to-right"
                        iconClassName="angle-right"
                        onClick={this.props.moveRight}
                    />
                    <Card
                        leadText={this.state.leadText}
                        bodyText={this.state.bodyText}
                        handleChangeLeadText={this.handleChangeLeadText}
                        handleChangeBodyText={this.handleChangeBodyText}
                        placeholder={this.state.cardPlaceholder}
                        ref={this.cardRef}
                        onFocus={this.handleCardFocus}
                        onBlur={this.handleCardBlur}
                    />
                </div>
                <TreeView />
                <EditorControls
                    hideAllIf={this.props.isTreeMode}
                    controls={{
                        edit: {
                            visibleIf: !this.props.isEditMode,
                            handleClick: this.handleEdit.bind(this)
                        },
                        add: {
                            visibleIf: this.isAllowedToAddSiblings() &&
                                !this.props.isEditMode,
                            handleClick: this.handleAdd.bind(this)
                        },
                        remove: {
                            visibleIf: this.isAllowedToAddSiblings() &&
                                !this.props.isEditMode
                        },
                        save: {
                            visibleIf: this.props.isEditMode,
                            handleClick: this.handleSave.bind(this)
                        },
                        discard: {
                            visibleIf: this.props.isEditMode,
                            handleClick: this.handleDiscard.bind(this)
                        }
                    }}
                />
            </div>
        );
    }
}

export default EditorView;