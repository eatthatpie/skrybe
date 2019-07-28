import EditorView from '@/view/editor/EditorView';
import { connect } from 'react-redux';

const stateToProps = function(state) {
    return ({
        outlineTree: state.outlineTree
    });
};

const dispatchToProps = function(dispatch) {
    return {};
};

export default connect(stateToProps, dispatchToProps)(EditorView);