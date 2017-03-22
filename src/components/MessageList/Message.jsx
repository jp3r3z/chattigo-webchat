import React from 'react';
import ReactDOM from 'react-dom';
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

    is_image(attachment) {
        const with_thumbnail = [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/gif'
        ]
        return with_thumbnail.reduce((acc, val) => {
            return acc || val === attachment.content_type;
        }, false);
    };

    openLightbox(attachment) {
        if (this.is_image(attachment))
            this.setState({ lightboxIsOpen: true });
    }

    closeLightbox() {
        this.setState({ lightboxIsOpen: false });
    }

    render(){
        const message = this.props.message;
        const settings = this.context.settings;
        let attachments = null;
        if (message.attachments) {
            const should_have_preview = (attachment) => {
                const with_thumbnail = [
                    'application/pdf',
                    'image/png',
                    'image/jpeg',
                    'image/jpg',
                    'image/gif'
                ]
                return with_thumbnail.reduce((acc, val) => {
                    return acc || val === attachment.content_type;
                }, false);
            };
            const theres_at_least_one_image = message.attachments.map(this.is_image).reduce((acc, val) => {
                return acc || val;
            }, false);
            const produce_preview = (attachment) => {
                let source = null;
                if (should_have_preview(attachment)) {
                    if (this.is_image(attachment)) {
                        return (
                        <img
                            key={attachment.name}
                            src={attachment.url.thumbnail}
                            alt={attachment.name}
                            onClick={() => {this.openLightbox(attachment)}}
                        />
                        );
                    } else {
                        if (attachment.content_type === 'application/pdf') {
                            source = attachment.url.thumbnail;
                        }
                    }
                } else {
                    source = require("../../assets/images/file.png");
                }
                return <a
                    key={attachment.name}
                    title={attachment.name}
                    href={attachment.url.original}
                    target="_blank"
                    >
                    <img
                        src={source}
                        alt={attachment.name}
                        />
                </a>;
            };
            let Widget = null;
            let AnchorTag = null;
            if (theres_at_least_one_image) {
                let images = message.attachments.map((attachment) => {
                    if (should_have_preview(attachment)) {
                        return {
                            src: attachment.url.original,
                            thumbnail: attachment.url.thumbnail,
                            caption: attachment.name
                        };
                    } else {
                        return null;
                    }
                });
                Widget = (
                    <Lightbox
                        images={images}
                        isOpen={this.state.lightboxIsOpen}
                        onClose={() => {this.closeLightbox()}}
                    />
                );

            }
            attachments = (
                <div className={"chattigo-message-attachments"}>
                    {Widget}
                    {message.attachments.map((attachment) => {
                        return produce_preview(attachment);
                    })}
                </div>
            );
        }
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
                        {attachments}
                        <Linkify>{message.content}</Linkify>
                    </div>
                </div>
            </div>
            );
    }
}
Message.contextTypes = { settings: React.PropTypes.object };
