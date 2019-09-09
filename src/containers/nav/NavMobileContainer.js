import NavMobile from '@/view/nav/NavMobile';
import { connect } from 'react-redux';

const stateToProps = function(state) {
    return ({
    });
};

const dispatchToProps = function(dispatch) {
    return {
        navAsideOpen() {
            alert('opening');
        }
    };
};

export default connect(stateToProps, dispatchToProps)(NavMobile);
