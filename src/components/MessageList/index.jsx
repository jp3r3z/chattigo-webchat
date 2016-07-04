import 'babel-polyfill';
import $ from 'jquery';
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import Message from './Message';

class UnconnectedMessageList extends Component {
    componentDidMount() {
        this.selector = "#chattigo-message-list"; 
        $(this.selector).mCustomScrollbar({
            axis:"y",
            theme: "dark",
            setHeight: this.context.settings.height * 0.63,
            mouseWheel:{
                enable: true,
                axis: "y"
            },
            scrollButtons: { enable: true },
            scrollbarPosition: "inside",
            callbacks:{
                onInit: function(){
                    $(this.selector).mCustomScrollbar("scrollTo","bottom");
                }
            }
        });
    }

    componentWillUnmount() {
        $(this.selector).mCustomScrollbar("destroy");
    }

    componentDidUpdate(prevProps, prevState) {
        $(this.selector).mCustomScrollbar("update");
        $(this.selector).mCustomScrollbar("scrollTo","bottom", {scrollInertia: 0});
    }

    render(){
        let styles = { height: this.context.settings.height * 0.63 };
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
UnconnectedMessageList.contextTypes = { settings: React.PropTypes.object };


const mapStateToProps = (state) => {
    return {
        messages: state.messages
    }
};

const MessageList = connect(mapStateToProps)(UnconnectedMessageList);

export default MessageList; 
