import React from 'react';

/**
 * @FIXME
 * This code is copied from codepen:
 * https://codepen.io/robertwbradford/pen/wgoEPG?editors=0010
 * 
 * Write your own class to chandle this component.
 */
export default class ContentEditable extends React.Component {
    constructor() {
        super();

        this.emitChange = this.emitChange.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return (
            !this.htmlEl
            ||
            (nextProps.html !== this.htmlEl.innerHTML &&
                nextProps.html !== this.props.html)
            ||
            this.props.isDisabled !== nextProps.isDisabled
        );
    }

    componentDidUpdate() {
        if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML) {
            this.htmlEl.innerHTML = this.props.html;
        }
    }

    emitChange(evt) {
        if (!this.htmlEl) return;
        var html = this.htmlEl.innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            evt.target = {
                value: html
            };

            this.props.onChange(evt);
        }
        this.lastHtml = html;
    }

    render() {
        var {
            tagName,
            html,
            onChange,
            ...props
        } = this.props;

        return React.createElement(
            tagName || 'div', {
                ...props,
                ref: (e) => this.htmlEl = e,
                onInput: this.emitChange,
                onBlur: this.props.onBlur || this.emitChange,
                contentEditable: !this.props.isDisabled,
                dangerouslySetInnerHTML: {
                    __html: html
                }
            },
            this.props.children);
    }
};