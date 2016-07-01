import React from 'react';
import { Component } from 'react';
import { Panel } from 'react-bootstrap';
import Message from './Message';

export default class MessageList extends Component {
    render(){
        return (
            <Panel
                id={"chattigo-message-list"}
                style={{
                    height: this.context.settings.height * 0.63
                }}
                >
                <Message/>
                <Message/>
                <Message/>
                <Message/>
            </Panel>
            );
    }
}
MessageList.contextTypes = { settings: React.PropTypes.object };