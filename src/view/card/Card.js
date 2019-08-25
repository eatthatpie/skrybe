import React from 'react';
import ContentEditable from '@/view/editable/ContentEditable';
import { rand } from '@/helpers';
import './Card.scss';

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.placeholders = [
            'Write a little bit more about that.',
            'What`s that all about?',
            'Describe how it actually goes.',
            'What more should the reader know about it?'
        ];
        
        this.state = {
            bodyClassName: props.bodyText.length > 0
                ? 'card-body'
                : 'card-body is-empty',
            leadClassName: props.leadText.length > 0
                ? 'card-lead color-light'
                : 'card-lead color-light is-empty',
            bodyPlaceholder: props.placeholder || this.placeholders[0]
        };

        this.focus = this.focus.bind(this);

        this.contentEditableRef = React.createRef();
    }

    focus() {
        this.contentEditableRef.current.focus();
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.bodyText !== nextProps.bodyText) {
            this.setState({
                bodyClassName: nextProps.bodyText.length > 0
                    ? 'card-body'
                    : 'card-body is-empty'
            });

            if (nextProps.bodyText.length <= 0) {
                this.setState({
                    bodyPlaceholder: nextProps.placeholder ||
                        this.placeholders[rand(0, this.placeholders.length - 1)]
                });
            }
        }

        if (this.props.leadText !== nextProps.leadText) {
            this.setState({
                leadClassName: nextProps.leadText.length > 0
                    ? 'card-lead color-light'
                    : 'card-lead color-light is-empty'
            })
        }

        return true;
    }

    render() {
        const { leadText, bodyText, handleChangeLeadText, handleChangeBodyText } = this.props;

        return (
            <div className="card bg-light">
                <div
                    className={this.state.leadClassName}
                    data-placeholder="This is another sibling of the story tree node you've edited before. Write here a word of what you're going to write down below."
                >
                    <ContentEditable
                        html={leadText}
                        isDisabled={false}
                        onChange={handleChangeLeadText}
                    />
                    <i className="fas fa-pencil-alt fs-10 color-light bg-light" />
                </div>
                <div
                    className={this.state.bodyClassName}
                    data-placeholder={this.state.bodyPlaceholder}
                >
                    <ContentEditable
                        html={bodyText}
                        isDisabled={false}
                        onChange={handleChangeBodyText}
                        ref={this.contentEditableRef}
                    />
                    <i className="fas fa-pencil-alt fs-10 color-light bg-light" />
                </div>
            </div>
        );
    }
};