import NavAside from '@/view/nav/NavAside';
import { connect } from 'react-redux';
import { navToggle, navAsideMobileToggle } from '@/actions/index';

const stateToProps = function(state) {
    return ({
        nav: state.nav.items,
        isOpenMobile: state.view.navAsideMobile.isOpen
    });
};

const dispatchToProps = function(dispatch) {
    return {
        handleClick(e) {
            const name = e.target.getAttribute('data-nav-name');

            dispatch(navToggle({ name }));
        },
        closeNavAsideMobile() {
            dispatch(navAsideMobileToggle({ isOpen: false }));
        }
    };
};

export default connect(stateToProps, dispatchToProps)(NavAside);
