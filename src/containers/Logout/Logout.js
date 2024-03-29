import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';

class Logout extends Component {
    componentDidMount () {
        this.props.onDisconnect();
        this.props.onLogout();
    }

    render () {
        return <Redirect to="/login" />
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout()),
        onDisconnect: () => dispatch(actions.disconnect())
    };
};

export default connect(null, mapDispatchToProps)(Logout);