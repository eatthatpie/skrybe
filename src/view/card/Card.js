import React from 'react';
import ContentEditable from '@/view/editable/ContentEditable';
import { rand } from '@/helpers';
import './Card.scss';

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.placeholders = [
            'Write here.',
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

    componentWillUpdate(nextProps) {
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
    }

    render() {
        const { leadText, bodyText, handleChangeLeadText, handleChangeBodyText } = this.props;
        const parentBodyText = this.props.parentBodyText
            ? '<strong>This card`s ancestor content</strong>:<br/>' + this.props.parentBodyText.replace(leadText, `<strong>${leadText}</strong>`)
            : null;

        return (
            <div className="card bg-light pt-15">
                <div
                    className={this.state.leadClassName}
                    data-placeholder="Type here what are you going to write about below."
                >
                    {parentBodyText &&
                        <div
                            className="card-tooltip bg-reversed br-50 text-center fs-8 sl:hide"
                            dangerouslySetInnerHTML={{ __html:parentBodyText }}
                        />
                    }
                    <ContentEditable
                        html={leadText}
                        isDisabled={false}
                        onChange={handleChangeLeadText}
                        onBlur={this.props.onBlur}
                        onFocus={this.props.onFocus}
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
                        onBlur={this.props.onBlur}
                        onFocus={this.props.onFocus}
                        ref={this.contentEditableRef}
                    />
                    <i className="fas fa-pencil-alt fs-10 color-light bg-light" />
                </div>
            </div>
        );
    }
};