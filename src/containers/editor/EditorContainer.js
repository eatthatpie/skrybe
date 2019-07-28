import EditorView from '@/view/editor/EditorView';
import { connect } from 'react-redux';
import { setOutlineTreeNode } from '@/actions/index';

const stateToProps = function(state) {
    return ({
        outlineTree: state.outlineTree
    });
};

const dispatchToProps = function(dispatch) {
    return {
        setCard({ nodeId, parentNodeId, leadText, bodyText }) {
            dispatch(setOutlineTreeNode({nodeId, parentNodeId, leadText, bodyText }));
        }
    };
};

export default connect(stateToProps, dispatchToProps)(EditorView);