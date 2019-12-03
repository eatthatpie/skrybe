import React from 'react';
import ContentEditable from '@/view/editable/ContentEditable';
import { rand } from '@/helpers';
import './Card.scss';

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.placeholders = [
            'Write about it here.',
        ];
        
        this.state = {
            bodyClassName: props.bodyText.length > 0
                ? 'card-body fs-20 bg-light'
                : 'card-body fs-20 bg-light is-empty',
            leadClassName: props.leadText.length > 0
                ? 'card-lead color-muted after:color-muted'
                : 'card-lead color-muted after:color-muted is-empty',
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
                    ? 'card-body fs-20 bg-light'
                    : 'card-body fs-20 bg-light is-empty'
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
                    ? 'card-lead color-muted after:color-muted'
                    : 'card-lead color-muted after:color-muted is-empty'
            })
        }
    }

    render() {
        const { leadText, bodyText, handleChangeLeadText, handleChangeBodyText } = this.props;
        const parentBodyText = this.props.parentBodyText
            ? '<strong>This card`s ancestor content</strong>:<br/>' + this.props.parentBodyText.replace(leadText, `<strong>${leadText}</strong>`)
            : null;

        return (
            <div className="card pt-15 wide">
                <div
                    className={this.state.leadClassName}
                    data-placeholder="Type here what are you going to write about below."
                >
                    {/* {parentBodyText &&
                        <div
                            className="card-tooltip bg-reversed br-50 text-center fs-8 sl:hide"
                            dangerouslySetInnerHTML={{ __html:parentBodyText }}
                        />
                    } */}
                    <div style={{
                        position: 'absolute',
                        left: 0,
                        width: '20px',
                        top: '14px',
                        bottom: '46px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'stretch',
                        alignItems: 'stretch'
                    }}>
                        <span style={{
                            width: '100%',
                            display: 'block',
                            backgroundColor: '#3e70e0',
                            height: '50%'
                        }} />
                        <span style={{
                            width: '100%',
                            display: 'block',
                            backgroundColor: '#d86060',
                            height: '50%'
                        }} />
                    </div>
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