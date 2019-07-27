import NavAside from '@/view/nav/NavAside';
import { connect } from 'react-redux';
import { navToggle } from '@/actions/index';

const stateToProps = function(state) {
    return ({
        nav: state.nav
    });
};

const dispatchToProps = function(dispatch) {
    return {
        handleClick(e) {
            const name = e.target.getAttribute('data-nav-name');

            dispatch(navToggle({ name }));
        }
    };
};

export default connect(stateToProps, dispatchToProps)(NavAside);