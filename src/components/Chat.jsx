import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import ChatPanel from './ChatPanel';

class ChatWrapper extends Component {
    render() {
        if (this.props.session === null || this.props.session === undefined) {
            return (<LoginForm/>);
        } else {
            return (<ChatPanel/>);
        }
    }
}

const mapStateToProps = (state) => ({ session: state.session });

const Chat = connect(mapStateToProps)(ChatWrapper);

export default Chat;