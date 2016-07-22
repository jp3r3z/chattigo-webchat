import 'babel-polyfill';
import $ from 'jquery';
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import Message from './Message';

class DisconnectedMessageList extends Component {
    componentDidMount() {
        this.selector = "#chattigo-message-list";
        $(this.selector).stop().animate({
            scrollTop: $(this.selector)[0].scrollHeight
        }, 800);
    }

    componentDidUpdate(prevProps, prevState) {
        $(this.selector).stop().animate({
            scrollTop: $(this.selector)[0].scrollHeight
        }, 800);
    }

    render(){
        let styles = { height: this.context.settings.height * 0.58 };
        const image = this.context.settings.message_list_background_image;
        if (image !== null) {
            if (image == false) {
                Object.assign(styles, { backgroundImage: "none" });
            } else {
                Object.assign(styles, { backgroundImage: "url("+image+")" });
            }
        }
        return (
            <Panel
                id={"chattigo-message-list"}
                style={styles}
                >
                {this.props.messages.map(message => {
                    return <Message key={message.id} message={message}/>;
                })}
            </Panel>
            );
    }
}
DisconnectedMessageList.contextTypes = { settings: React.PropTypes.object };


const mapStateToProps = (state) => {
    return {
        messages: state.messages
    }
};

const MessageList = connect(mapStateToProps)(DisconnectedMessageList);

export default MessageList; 
