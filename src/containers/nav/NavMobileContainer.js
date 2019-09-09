import NavMobile from '@/view/nav/NavMobile';
import { connect } from 'react-redux';
import { navAsideMobileToggle } from '@/actions';

const stateToProps = function(state) {
    return ({
    });
};

const dispatchToProps = function(dispatch) {
    return {
        openNavAsideMobile() {
            dispatch(navAsideMobileToggle({ isOpen: true }));
        }
    };
};

export default connect(stateToProps, dispatchToProps)(NavMobile);
