import ButtonCircle from '@/view/button/ButtonCircle';
import Content from '@/view/content/Content';
import React from 'react';

export default function PopupTutorialStep1(props) {
    return (
        <div className="popup-dashboard h-100p flex flex-center ph-15 o-a">
            <Content className="text-center m-a">
                <h3 className="mb-30">
                    {props.popupData.props.headerText || `Great, you've just created your first card!`}
                </h3>
                <p>
                    You can now generate story nodes resulting from each sentence of what have you written just now.<br/><br/>Later, while working on other cards, you'll do this by clicking this button:
                </p>
                <p>
                    <ButtonCircle iconClassName="fas fa-sitemap color-default" />
                </p>
                <p>
                    To add sibling to currently edited node click this button:
                </p>
                <p>
                    <ButtonCircle iconClassName="fas fa-plus color-default" />
                </p>
                <p>
                    To preview the whole story tree click the button on the top right corner of the screen:
                </p>
                <p>
                    <ButtonCircle iconClassName="fas fa-project-diagram color-default" className="bg-black" />
                </p>
                <p>
                    Have fun with Skrybe!
                </p>
                {!props.popupData.props.isGenerateButtonHidden &&
                    <p className="pt-30">
                        <a
                            className="bg-primary h:bg-primary-lighten d-inb br-50 h-60 sl:h-48 flex c-p min-w-320 max-w-100p max-w-400 mh-auto"
                            onClick={() => { props.popupData.props.onClickGenerateDescendants() }}
                        >
                            Generate story nodes
                        </a>
                    </p>
                }
                <p className="pb-20">
                    <a
                        className="bg-reversed d-inb br-50 h-60 sl:h-48 flex c-p min-w-320 max-w-100p max-w-400 mh-auto"
                        onClick={() => { props.popupData.props.onClickGoBackToEditing() }}
                    >
                        Go back to editing
                    </a>
                </p>
            </Content>
        </div>
    );
}
