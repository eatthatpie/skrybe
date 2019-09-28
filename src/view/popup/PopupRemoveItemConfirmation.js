import Content from '@/view/content/Content';
import React from 'react';

export default function PopupRemoveItemConfirmation(props) {
    return (
        <div className="popup-remove-item-confirmation h-100p flex flex-center ph-15 o-a">
            <Content className="text-center m-a">
                {props.popupData.props && props.popupData.props.currentNode &&
                    <p>
                        <em>
                            {props.popupData.props.currentNode.leadText}
                        </em>
                    </p>
                }
                <p>
                    This card and all its descendants will be removed permanently.
                </p>
                <p>
                    You won't be able to undone this action later.
                </p>
                <p>
                    Are you sure you want to do this?
                </p>
                <p className="pt-50">
                    <a
                        className="bg-social-google d-inb br-50 min-h-60 sl:h-48 flex c-p"
                        onClick={() => { if (props.popupData.props) props.popupData.props.onRemove() } }
                    >
                        Yes, remove this card and all its descendants
                    </a>
                </p>
                <p>
                    <a
                        className="bg-reversed d-inb br-50 h-60 sl:h-48 flex c-p"
                        onClick={() => { props.togglePopup({ isActive: false }) }}
                    >
                        Cancel! Cancel! Cancel!
                    </a>
                </p>
            </Content>
        </div>
    );
}
