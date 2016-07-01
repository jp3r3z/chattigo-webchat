import React from 'react';
import 'babel-polyfill';
import { Component } from 'react';
import { Panel } from 'react-bootstrap';
import Message from './Message';

export default class MessageList extends Component {
    render(){
        let styles = { height: this.context.settings.height * 0.63 };
        const image = this.context.settings.message_list_background_image;
        console.log('Original image: ', image);
        if (image !== null) {
            if (image == false) {
                console.log('no image: ', image);
                Object.assign(styles, { backgroundImage: "none" });
            } else {
                console.log('image: ', image);
                Object.assign(styles, { backgroundImage: "url("+image+")" });
            }
        }
        return (
            <Panel
                id={"chattigo-message-list"}
                style={styles}
                >
                <div className={"overlay"}></div>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
            </Panel>
            );
    }
}
MessageList.contextTypes = { settings: React.PropTypes.object };