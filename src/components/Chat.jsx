import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import ChatPanel from './ChatPanel';

class ChatWrapper extends Component {
    render() {
        if (this.props.is_loggedin) {
            return (<ChatPanel/>);
        } else {
            return (<Login/>);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        is_loggedin: state.session.is_loggedin
    }
}

const Chat = connect(mapStateToProps)(ChatWrapper);

export default Chat;