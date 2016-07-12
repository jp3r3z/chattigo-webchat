import React from 'react';
import classNames from 'classnames';
import { Component } from 'react';
import { kebabCase } from 'lodash/string';
import moment from 'moment';

export default class Message extends Component {
    render(){
        const message = this.props.message;
        const settings = this.context.settings;
        return (
            <div className="chattigo-message-container">
                <div className={classNames("chattigo-message", "chattigo-message-from-"+kebabCase(message.origin))}>
                    <div className={"chattigo-message-header"}>
                        <div className={"chattigo-message-author"}>{message.author.name}</div>
                        <div className={"chattigo-message-timestamp"}>
                            {moment(message.timestamp).locale(settings.locale).fromNow()}
                        </div>
                    </div>
                    <div className={classNames("chattigo-message-content", "chattigo-message-"+kebabCase(message.type)+"-content")}>
                        {message.content}
                    </div>
                </div>
            </div>
            );
    }
}
Message.contextTypes = { settings: React.PropTypes.object };