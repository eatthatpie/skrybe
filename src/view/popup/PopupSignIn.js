import Content from '@/view/content/Content';
import React from 'react';

export default function PopupDashboard(props) {
    return (
        <div className="popup-dashboard h-100p flex flex-center ph-15 o-a">
            <Content className="text-center m-a">
                <h3>
                    Your progress is saved and matched with this <strong>browser</strong> at this <strong>device</strong>.
                </h3>
                <p>
                    However, in order to give you <strong>remote access</strong> to your story, Skrybe needs to know <strong>who</strong> you are.
                </p>
                <p>
                    Sign in to save your progress.
                </p>
                <p className="pt-30">
                    <a
                        className="bg-social-google d-inb br-50 h-48 flex c-p max-w-400 mh-auto"
                        onClick={props.signInWithGoogleFunc}
                    >
                        Sign in with Google
                    </a>
                </p>
                <p>
                    <a
                        className="bg-social-tw d-inb br-50 h-48 flex c-p max-w-400 mh-auto"
                        onClick={props.signInWithTwitterFunc}
                    >
                        Sign in with Twitter
                    </a>
                </p>
                <p>
                    <a
                        className="bg-social-fb d-inb br-50 h-48 flex c-p max-w-400 mh-auto"
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
