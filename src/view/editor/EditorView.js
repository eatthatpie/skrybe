import Card from '@/view/card/Card';
import React from 'react';
import './EditorView.scss';

class EditorView extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.setCard({
            parentNodeId: 'root',
            leadText: 'to ciekawe'
        });

        setTimeout(() => {
            this.props.setCard({
                nodeId: '1',
                bodyText: 'wwaaaaa'
            });

            setTimeout(() => {
                console.log(this.props.outlineTree);
            }, 1000);
        }, 2000);
    }
    
    render() {
        return (
            <div className="editor-view flex">
                <Card leadText={this.props.outlineTree.root.leadText} />
            </div>
        );
    }
}

export default EditorView;