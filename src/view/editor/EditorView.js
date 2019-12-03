import CardsGridContainer from '@/containers/CardsGridContainer';
import EditorControls from '@/view/editor/EditorControls';
import HintSignIn from '@/view/hint/HintSignIn';
import TreeView from '@/view/tree/TreeView';
import TreeViewToggler from '@/view/tree/TreeViewToggler';
import React, { useState, useEffect } from 'react';
import './EditorView.scss';

export default function EditorView(props) {
    const [leadText, setLeadText] = useState(props.currentNode.leadText || '');
    const [bodyText, setBodyText] = useState(props.currentNode.bodyText || '');
    const [
        shouldSaveToDatabaseOnUpdate,
        setShouldSaveToDatabaseOnUpdate
    ] = useState(false);

    useEffect(() => {
        if (shouldSaveToDatabaseOnUpdate && props.isAuth) {
            props.database.set(
                `/user/${props.currentUserId}/project/test-project`,
                props.outlineTree
            );

            setShouldSaveToDatabaseOnUpdate(false);
        } else if (shouldSaveToDatabaseOnUpdate && !props.isAuth) {
            localStorage.setItem(
                'skrybe:osot',
                JSON.stringify(props.outlineTree)
            );

            setShouldSaveToDatabaseOnUpdate(false);
        }
    }, [props.outlineTree]);

    useEffect(() => {
        setLeadText(props.currentNode.leadText);
        setBodyText(props.currentNode.bodyText);
    }, [props.currentNode.bodyText, props.currentNode.leadText]);

    // @TODO: this is not working at the moment
    function handleDiscard() {
        setLeadText(props.currentNode.leadText || '');
        setBodyText(props.currentNode.bodyText || '');
    }

    function handleAdd() {
        if (!props.canAddSiblings) {
            return;
        }

        props.insertCard({
            parentNodeId: props.parentNodeId,
            leadText: '',
            bodyText: ''
        });
    }

    function handleSave() {
        setShouldSaveToDatabaseOnUpdate(true);

        if (
            props.outlineTree.currentNodeId === 'root' &&
            props.hasExactlyOneItemBesidesRoot &&
            bodyText.length > 0
        ) {
            props.togglePopup({
                isActive: true,
                type: 'tutorial-step-1',
                props: {
                    onClickGenerateDescendants() {
                        props.togglePopup({ isActive: false });

                        handleGenerate();
                    },
                    onClickGoBackToEditing() {
                        props.togglePopup({ isActive: false });
                    }
                }
            });
        }

        props.updateCard({
            nodeId: props.outlineTree.currentNodeId,
            leadText: leadText,
            bodyText: bodyText
        });

        // const gtagPayload = {
        //     'event_category': 'card',
        //     'event_label': bodyText,
        //     'value': 1
        // };

        // gtag('event', 'save', gtagPayload);
    }

    function handleRemove() {
        props.togglePopup({
            isActive: true,
            type: 'remove-item-confirmation',
            props: {
                currentNode: props.currentNode,
                onRemove() {
                    props.togglePopup({ isActive: false });

                    setShouldSaveToDatabaseOnUpdate(true);

                    props.moveToNode({
                        nodeId: props.currentNode.parentNodeId
                    });

                    props.removeNodeWithDescendants({
                        nodeId: props.outlineTree.currentNodeId
                    });
                }
            }
        });
    }

    function handleGenerate() {
        if (!props.canAddChildren) {
            return;
        }

        setShouldSaveToDatabaseOnUpdate(true);

        const nodeId = props.outlineTree.currentNodeId;

        props.generateDescendants({ nodeId });

        // const gtagPayload = {
        //     'event_category': 'card',
        //     'event_label': bodyText,
        //     'value': 1
        // };
    
        // gtag('event', 'generate', gtagPayload);
    }

    function handleTreeBulletClick(nodeId) {
        props.moveToNode({ nodeId });
        props.toggleTreeMode({ isTreeMode: false });
    }

    function handleChangeLeadText(e) {
        setLeadText(e.target.value);
    }

    function handleChangeBodyText(e) {
        setBodyText(e.target.value);
    }

    function handleCardFocus() {
        setTimeout(() => {
            props.toggleEditMode({ isEditMode: true });
        }, 200);
    }

    function handleCardBlur() {
        // @TODO: handle this by onClick on .editor-view
        setTimeout(() => {
            // @TODO: should have callback
            props.toggleEditMode({ isEditMode: false });

            if (
                bodyText !== props.currentNode.bodyText ||
                leadText !== props.currentNode.leadText
            ) {
                handleSave();
            }
        }, 10);
    }

    function handleSignInButtonClick() {
        props.togglePopup({ isActive: true, type: 'sign-in' })
    }

    return (
        <div
            className={
                `editor-view${props.isTreeMode ? ' is-tree-view' : ''}${props.isEditMode ? ' is-edit-mode' : ''}`
            }
        >
            <EditorControls
                hideAllIf={props.isTreeMode}
                className="editor-controls--mobile flex flex-normal flex-sb fixed cover-top h-60 bg-black z-550 ph-15 st:ph-0"
                controls={{
                    save: {
                        visibleIf: props.isEditMode,
                        handleClick: handleSave.bind(this)
                    },
                    discard: {
                        visibleIf: props.isEditMode,
                        handleClick: handleDiscard.bind(this)
                    }
                }}
            />
            <TreeViewToggler
                className={`z-550 ${props.isTreeMode ? 'is-tree-mode' : ''}`}
                handleClick={() => { props.toggleTreeMode({ isTreeMode: !props.isTreeMode }) }}
                title="Toggle story tree view"
            />
            <CardsGridContainer
                bodyText={bodyText}
                leadText={leadText}
                handleChangeBodyText={handleChangeBodyText}
                handleChangeLeadText={handleChangeLeadText}
                handleCardFocus={handleCardFocus}
                handleCardBlur={handleCardBlur.bind(this)}
                handleSave={handleSave.bind(this)}
            />
            <TreeView
                data={props.outlineTree.items}
                currentNodeId={props.outlineTree.currentNodeId}
                handleClick={handleTreeBulletClick}
            />
            <EditorControls
                hideAllIf={props.isTreeMode}
                controls={{
                    generate: {
                        visibleIf: (
                            !props.isEditMode &&
                            props.currentNode.bodyText.length > 0
                        ),
                        disabledIf: !props.canAddChildren,
                        handleClick: handleGenerate.bind(this)
                    },
                    add: {
                        visibleIf: props.canAddSiblings &&
                            !props.isEditMode,
                        handleClick: handleAdd.bind(this)
                    },
                    remove: {
                        visibleIf: props.canAddSiblings &&
                            !props.isEditMode,
                        handleClick: handleRemove.bind(this)
                    }
                }}
            />
        </div>
    );
}
