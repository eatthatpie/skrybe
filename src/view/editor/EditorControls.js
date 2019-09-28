import ButtonCircle from '@/view/button/ButtonCircle';
import React from 'react';
import './EditorControls.scss';

export default function EditorControls(props) {
    const controlsMap = {
        add: {
            className: 'control-add h:bg-primary-lighten',
            iconClassName: 'fas fa-plus color-default',
            title: 'Add sibling for this card'
        },
        generate: {
            className: 'control-generate h:bg-primary-lighten',
            iconClassName: 'fas fa-sitemap color-default',
            title: 'Generate descendants for this card',
            titleDisabled: 'You cannot generate descendants if there are some already'
        },
        save: {
            className: 'control-save h:bg-primary-lighten',
            iconClassName: 'fas fa-check color-default',
            title: 'Save changes'
        },
        edit: {
            className: 'control-edit h:bg-primary-lighten',
            iconClassName: 'fas fa-pen color-default',
            title: 'Edit this card'
        },
        remove: {
            className: 'control-remove bg-social-google',
            iconClassName: 'fas fa-trash-alt color-default',
            title: 'Remove this card'
        },
        discard: {
            className: 'control-discard bg-reversed',
            iconClassName: 'fas fa-times color-bg',
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
                    const isDisabled = props.controls[item].disabledIf || false;

                    const handleClick = props.controls[item].handleClick && !isDisabled
                        ? props.controls[item].handleClick
                        : () => {}

                    if (condition !== null && condition !== undefined && !condition) {
                        return null;
                    }

                    return (
                        <ButtonCircle
                            key={index}
                            className={`${control.className} ${isDisabled ? 'is-disabled' : ''}`}
                            iconClassName={control.iconClassName}
                            title={isDisabled && control.titleDisabled ? control.titleDisabled : control.title}
                            handleClick={handleClick}
                        />
                    )
                })
            }
        </div>
    );
}
