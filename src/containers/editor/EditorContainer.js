import EditorView from '@/view/editor/EditorView';
import { connect } from 'react-redux';
import { getCurrentNode } from '@/selectors/index';
import {
    generateDescendantsOfNode,
    setOutlineTreeNode
} from '@/actions/index';

const stateToProps = function(state) {
    return ({
        currentNode: getCurrentNode(state),
        outlineTree: state.outlineTree
    });
};

const dispatchToProps = function(dispatch) {
    return {
        insertCard({ parentNodeId, leadText, bodyText }) {
            dispatch(setOutlineTreeNode({ parentNodeId, leadText, bodyText }));
        },
        updateCard({ nodeId, leadText, bodyText }) {
            dispatch(setOutlineTreeNode({ nodeId, leadText, bodyText }));
            dispatch(generateDescendantsOfNode({ nodeId }));
        }
    };
};

export default connect(stateToProps, dispatchToProps)(EditorView);