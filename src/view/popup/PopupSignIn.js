import Content from '@/view/content/Content';
import React from 'react';

export default function PopupDashboard(props) {
    return (
        <div className="popup-dashboard h-100p flex flex-center">
            <Content className="text-center">
                <h3>
                    Skrybe needs to match you with your story.
                </h3>
                <p>
                    Sign in to save your progress.
                </p>
                <p className="pt-30">
                    <a
                        className="bg-social-google d-inb br-50 h-60 sl:h-48 flex c-p"
                        onClick={props.signInWithGoogleFunc}
                    >
                        Sign in with Google
                    </a>
                </p>
                <p>
                    <a
                        className="bg-social-tw d-inb br-50 h-60 sl:h-48 flex c-p"
                        onClick={props.signInWithTwitterFunc}
                    >
                        Sign in with Twitter
                    </a>
                </p>
                <p>
                    <a
                        className="bg-social-fb d-inb br-50 h-60 sl:h-48 flex c-p"
                        onClick={props.signInWithFacebookFunc}
                    >
                        Sign in with Facebook
                    </a>
                </p>
                <p className="pt-30">
                    <a
                        className="d-inb br-50 h-60 sl:h-48 flex c-p"
                        onClick={() => { props.togglePopup({ isActive: false })} }
                    >
                        Cancel
                    </a>
                </p>
            </Content>
        </div>
    );
}
