import Card from '@/view/card/Card';
import CardGhost from '@/view/card/CardGhost';
import EditorControls from '@/view/editor/EditorControls';
import HintSignIn from '@/view/hint/HintSignIn';
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
            Write a very short brief of your story. Try to mention its all main parts. For example: After breaking up with her boyfriend, JANE moves to a big city to forget about him. She decides to live in an unusual apartment...
        `
        this.rootPlaceholder = `
            For example: The main character -- JANE -- writes a book that eventually destroys her as a human.
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
            shouldGainFocusOnUpdate: false,
            shouldSaveToDatabaseOnUpdate: false
        }

        this.findCharacterNames = this.findCharacterNames.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDiscard = this.handleDiscard.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleChangeLeadText = this.handleChangeLeadText.bind(this);
        this.handleChangeBodyText = this.handleChangeBodyText.bind(this);
        this.handleCardFocus = this.handleCardFocus.bind(this);
        this.handleCardBlur = this.handleCardBlur.bind(this);
        this.handleTreeBulletClick = this.handleTreeBulletClick.bind(this);

        this.isAllowedToAddSiblings = this.isAllowedToAddSiblings.bind(this);

        this.cardRef = React.createRef();
    }

    componentWillUpdate(nextProps) {
        // @TESTING
        // if (
        //     this.state.shouldGainFocusOnUpdate &&
        //     nextProps.outlineTree.currentNodeId !== this.props.outlineTree.currentNodeId
        // ) {
        //     this.cardRef.current.focus();

        //     this.setState({
        //         shouldGainFocusOnUpdate: false
        //     });
        // }

        if (
            this.state.shouldSaveToDatabaseOnUpdate &&
            this.props.isAuth
        ) {
            this.props.database.set(
                `/user/${this.props.currentUserId}/project/test-project`,
                nextProps.outlineTree
            );

            this.setState({
                shouldSaveToDatabaseOnUpdate: false
            });
        } else if (
            this.state.shouldSaveToDatabaseOnUpdate &&
            !this.props.isAuth
        ) {
            localStorage.setItem(
                'skrybe:osot',
                JSON.stringify(nextProps.outlineTree)
            );

            this.setState({
                shouldSaveToDatabaseOnUpdate: false
            });
        }

        if (
            nextProps.outlineTree.currentNodeId === this.props.outlineTree.currentNodeId
        ) {
            return;
        }

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
        this.setState(
            {
                shouldGainFocusOnUpdate: true,
                shouldSaveToDatabaseOnUpdate: true
            },
            () => {
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
            });
    }

    handleRemove() {
        const self = this;

        this.props.togglePopup({
            isActive: true,
            type: 'remove-item-confirmation',
            props: {
                currentNode: this.props.currentNode,
                onRemove() {
                    self.props.togglePopup({
                        isActive: false
                    });

                    self.props.moveToNode({ nodeId: self.props.currentNode.parentNodeId });

                    self.props.removeNodeWithDescendants({
                        nodeId: self.props.outlineTree.currentNodeId
                    });

                    self.setState({
                        shouldSaveToDatabaseOnUpdate: true
                    });
                }
            }
        });
    }

    handleTreeBulletClick(nodeId) {
        this.props.moveToNode({ nodeId });
        this.props.toggleTreeMode({ isTreeMode: false });
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

            if (
                this.state.bodyText !== this.props.currentNode.bodyText ||
                this.state.leadText !== this.props.currentNode.leadText
            ) {
                this.handleSave();
            }
        }, 200);
    }
    
    render() {
        return (
            <div
                className={
                    `editor-view ${this.props.isTreeMode ? 'is-tree-view' : ''} ${this.props.isEditMode ? 'is-edit-mode' : ''}`
                }
            >
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
                        className={
                            `to-top ${!this.props.canMoveUp ? 'is-inactive' : ''}`
                        }
                        iconClassName="angle-up"
                        onClick={this.props.moveUp}
                    />
                    <CardGhost
                        className={
                            `to-bottom ${!this.props.canMoveDown ? 'is-inactive' : ''}`
                        }
                        iconClassName="angle-down"
                        onClick={this.props.moveDown}
                    />
                    <CardGhost
                        className={
                            `to-left ${!this.props.canMoveLeft ? 'is-inactive' : ''}`
                        }
                        iconClassName="angle-left"
                        onClick={this.props.moveLeft}
                    />
                    <CardGhost
                        className={
                            `to-right ${!this.props.canMoveRight ? 'is-inactive' : ''}`
                        }
                        iconClassName="angle-right"
                        onClick={this.props.moveRight}
                    />
                    <Card
                        leadText={this.state.leadText}
                        bodyText={this.state.bodyText}
                        parentBodyText={this.props.parentNode ? this.props.parentNode.bodyText : null}
                        handleChangeLeadText={this.handleChangeLeadText}
                        handleChangeBodyText={this.handleChangeBodyText}
                        placeholder={this.state.cardPlaceholder}
                        ref={this.cardRef}
                        onFocus={this.handleCardFocus}
                        onBlur={this.handleCardBlur}
                    />
                </div>
                <TreeView
                    data={this.props.outlineTree.items}
                    currentNodeId={this.props.outlineTree.currentNodeId}
                    handleClick={this.handleTreeBulletClick}
                />
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
                                !this.props.isEditMode,
                            handleClick: this.handleRemove.bind(this)
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
                {!this.props.isAuth &&
                    <HintSignIn
                        handleClick={
                            () => { this.props.togglePopup({ isActive: true, type: 'sign-in' }) }
                        }
                    />
                }
            </div>
        );
    }
}

export default EditorView;