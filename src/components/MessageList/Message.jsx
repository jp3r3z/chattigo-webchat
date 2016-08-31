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
                        {(() => {
                                if (message.attachments) {
                                    return <div className={"chattigo-message-attachments"}>
                                                {message.attachments.map((attachment) => {
                                                    return <img key={attachment.name} src={attachment.url.thumbnail} alt={attachment.name}/>;
                                                })}
                                           </div>;
                                }
                            })()
                        }
                        {message.content}
                    </div>
                </div>
            </div>
            );
    }
}
Message.contextTypes = { settings: React.PropTypes.object };
