import React from 'react';
import classNames from 'classnames';
import { Component } from 'react';
import { kebabCase } from 'lodash/string';
import Linkify from 'react-linkify';
import Lightbox from 'react-images';
import moment from 'moment';
import $ from 'jquery';

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = { lightboxIsOpen: false };
        this.openLightbox.bind(this);
        this.closeLightbox.bind(this);
    }

    componentDidMount(prevProps, prevState) {
        $(".chattigo-message span.Linkify a").attr( "target", "_blank" );
    }

    openLightbox(content_type) {
        if (content_type !== "application/pdf")
            this.setState({ lightboxIsOpen: true });
    }

    closeLightbox() {
        this.setState({ lightboxIsOpen: false });
    }

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
                                                <Lightbox
                                                    images={message.attachments.map((attachment) => {
                                                        if (attachment.content_type === "application/pdf") {
                                                            return null;
                                                        }
                                                        return {
                                                            src: attachment.url.original,
                                                            thumbnail: attachment.url.thumbnail,
                                                            caption: attachment.name
                                                        };
                                                    })}
                                                    isOpen={this.state.lightboxIsOpen}
                                                    onClose={() => {this.closeLightbox()}}
                                                />
                                                {message.attachments.map((attachment) => {
                                                    if (attachment.content_type === "application/pdf") {
                                                        return <a
                                                                    key={attachment.name}
                                                                    title={attachment.name}
                                                                    href={attachment.url.original}
                                                                    target="_blank"
                                                                >
                                                                    <img
                                                                        src={attachment.url.thumbnail}
                                                                        alt={attachment.name}
                                                                        onClick={() => {this.openLightbox(attachment.content_type)}}
                                                                        />
                                                                </a>;
                                                    } else {
                                                        return <img
                                                            key={attachment.name}
                                                            src={attachment.url.thumbnail}
                                                            alt={attachment.name}
                                                            onClick={() => {this.openLightbox(attachment.content_type)}}
                                                            />;
                                                    }
                                                })}
                                           </div>;
                                }
                            })()
                        }
                        <Linkify>{message.content}</Linkify>
                    </div>
                </div>
            </div>
            );
    }
}
Message.contextTypes = { settings: React.PropTypes.object };
