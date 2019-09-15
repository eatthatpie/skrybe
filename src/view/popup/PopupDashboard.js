import Content from '@/view/content/Content';
import React from 'react';

export default function PopupDashboard(props) {
    return (
        <div className="popup-dashboard h-100p flex flex-center">
            <Content className="text-center">
                <h2>
                    What would you like to do?
                </h2>
                <p>
                    <a
                        className="bg-primary h:bg-primary-lighten d-inb br-50 h-60 sl:h-48 flex c-p"
                        onClick={() => { props.togglePopup({ isActive: false })} }
                    >
                        Create your own story
                    </a>
                </p>
                <p>
                    <a
                        className="bg-primary h:bg-primary-lighten d-inb br-50 h-60 sl:h-48 flex c-p"
                        onClick={() => { props.togglePopup({ isActive: false })} }
                    >
                        Play with the example story
                    </a>
                </p>
                <p className="pt-50">
                    <a
                        className="bg-reversed d-inb br-50 h-60 sl:h-48 flex c-p"
                        onClick={() => { props.togglePopup({ isActive: true, type: 'sign-in' })} }
                    >
                        Sign in or sign up
                    </a>
                </p>
            </Content>
        </div>
    );
}
