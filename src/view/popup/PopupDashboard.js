import Content from '@/view/content/Content';
import LogoProps from '@/view/logo/LogoProps';
import React from 'react';

export default function PopupDashboard(props) {
    return (
        <div className="popup-dashboard h-100p flex flex-center ph-15 o-a">
            <Content className="text-center m-a">
                <LogoProps />
                <h2 className="mb-30">
                    Meet Skrybe.
                </h2>
                <p>
                    How it works?
                </p>
                <p className="frame bg-frame fs-12 sl:fs-8 mv-0 ph-10 pv-10">
                    You write sentences. You describe parts of the story.
                </p>
                <svg
                    width="100%"
                    height="40"
                    viewBox="0 0 100 20"
                    preserveAspectRatio={null}
                    className="mb--5"
                >
                    <path d="M50 0 C50 20, 100 0, 100 20" stroke="#fff" />
                    <path d="M50 0 C50 20, 0 0, 0 20" stroke="#fff" />
                </svg>
                <div className="grid grid-space-20">
                    <div className="text-center frame bg-frame fs-12 sl:fs-8 mv-0 ph-10">
                        <p><strong>You write sentences.</strong></p>
                        <p>Then you write more about each sentence.<br/>Try with two or more sentences.</p>
                    </div>
                    <div className="text-center frame bg-frame fs-12 sl:fs-8 mv-0 ph-10">
                        <p><strong>You describe parts of the story.</strong></p>
                        <p>You define parts.<br/>You write about them.<br/>As long and as much as it takes.</p>
                    </div>
                </div>
                <p>
                    Again and again.<br/>Skrybe will keep guiding you during your work.
                </p>
                <p className="pt-30">
                    <a
                        className="bg-primary h:bg-primary-lighten d-inb br-50 h-60 sl:h-48 flex c-p min-w-320 max-w-100p max-w-400 mh-auto"
                        onClick={() => { props.togglePopup({ isActive: false })} }
                    >
                        Create your own story
                    </a>
                </p>
                <p>
                    <a
                        className="bg-reversed d-inb br-50 h-60 sl:h-48 flex c-p min-w-320 max-w-100p max-w-400 mh-auto"
                        onClick={() => { props.togglePopup({ isActive: true, type: 'sign-in' })} }
                    >
                        Sign in or sign up
                    </a>
                </p>
            </Content>
        </div>
    );
}
