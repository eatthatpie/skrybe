import ButtonCircle from '@/view/button/ButtonCircle';
import React from 'react';
import './EditorControls.scss';

{/* <EditorControls
	controls="{['add', 'save', 'edit', 'remove', 'cancel']}"
	mode="bottom"
	state="{this.props.controlsState}"
/> */}

export default function EditorControls(props) {
    const controlsMap = {
        add: {
            className: 'control-add',
            iconClassName: 'fas fa-plus',
            title: 'Add sibling for this card'
        },
        save: {
            className: 'control-save',
            iconClassName: 'fas fa-check',
            title: 'Save changes'
        },
        edit: {
            className: 'control-edit',
            iconClassName: 'fas fa-pen',
            title: 'Edit this card'
        },
        remove: {
            className: 'control-remove',
            iconClassName: 'fas fa-trash-alt',
            title: 'Remove this card'
        },
        discard: {
            className: 'control-discard',
            iconClassName: 'fas fa-times',
            title: 'Discard changes'
        }
    };

    const isAllHidden = props.hideAllIf || false;

    return (
        <div className={`editor-controls ${props.className ? props.className : ''}`}>
            {!isAllHidden &&
                Object.keys(props.controls).reverse().map((item, index) => {
                    if (!controlsMap.hasOwnProperty(item)) {
                        return null
                    }

                    const control = controlsMap[item];
                    const condition = props.controls[item].visibleIf;

                    const handleClick = props.controls[item].handleClick
                        ? props.controls[item].handleClick
                        : () => {}

                    if (condition !== null && condition !== undefined && !condition) {
                        return null;
                    }

                    return (
                        <ButtonCircle
                            key={index}
                            className={control.className}
                            iconClassName={control.iconClassName}
                            title={control.title}
                            handleClick={handleClick}
                        />
                    )
                })
            }
        </div>
    );
}
