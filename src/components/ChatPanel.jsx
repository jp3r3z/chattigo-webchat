import React from 'react';
import moment from 'moment';
import { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { v4 } from 'node-uuid';
import { lowerCase } from 'lodash/string';
import {
    Panel,
    Form,
    Button,
    FormGroup,
    FormControl,
    Glyphicon
    } from 'react-bootstrap';
import { add_message } from '../actions';
import { Strings } from '../constants';
import MessageList from './MessageList';


class DisconnectedMessageForm extends Component {
    componentDidMount() {
        this.setEnterKeyListener()      
    }

    setEnterKeyListener() {
        const formcontrol = this.refs.message;
        const message_textarea = findDOMNode(formcontrol);
        
        try {
            message_textarea.addEventListerner('keydown', (e) => {
                if(e.keyCode==13) {
                    this.sendHandler(e);
                }
            });
        } catch (error) {
            // console.warn('Chattigo:', 'DisconnectedMessageForm:', 'Modern browsers setEnterKeyListener test failed.', error);
        }

        try {
            message_textarea.onkeydown = (e) => {
                e = e || window.event;
                const keyCode = e.keyCode || e.which;
                if(keyCode==13) {
                    this.sendHandler(e);
                }
            };
        } catch (error) {
            // console.warn('Chattigo:', 'DisconnectedMessageForm:', 'Legacy browsers setEnterKeyListener test failed.', error);
        }
    }

    sendHandler (e) {
        e.preventDefault();
        const formcontrol = this.refs.message;
        const message_textarea = findDOMNode(formcontrol);
        if (message_textarea.value !== "" && message_textarea.value !== null && message_textarea.value !== undefined){
            const message = {
                id: v4(),
                author: {
                    id: this.props.session.user,
                    name: this.props.session[lowerCase(this.context.settings.name_field)] || Strings.ANONYMOUS
                },
                timestamp: moment().valueOf(),
                origin: "customer",
                type: "text",
                content: message_textarea.value
            };
            message_textarea.value = "";
            this.props.onAddMessage(message, this.context.settings);
        }
    }
    render() {
        return (
            <Form inline>
                <div id={"chattigo-message-form"}>
                    <FormGroup controlId="formControlsTextarea">
                        <FormControl ref={"message"} componentClass="textarea" placeholder={Strings.PLACEHOLDER_MESSAGE} />
                    </FormGroup>
                    <Button
                        type="submit"
                        onClick={(e) => this.sendHandler(e)}
                        style={{
                            color: this.context.settings.send_color,
                            backgroundColor: this.context.settings.send_background_color
                        }}
                        >
                        <Glyphicon glyph={"send"} />
                    </Button>
                </div>
            </Form>
            );
    }
}
DisconnectedMessageForm.contextTypes = { settings: React.PropTypes.object };

const mapStateToProps = (state) => {
    return {
        session: state.session
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddMessage: (message, settings) => {
            settings.api.send(message).then((response) => {
                dispatch(add_message(message));
            }).catch((response) => {
                // console.error('Send message:', response);
            });
        }
    };
};

const MessageForm = connect(mapStateToProps, mapDispatchToProps)(DisconnectedMessageForm);

export default class ChatPanel extends Component {
    render() {
        return (
            <div style={{ height: '100%' }} >
                <MessageList/>
                <MessageForm/>
            </div>
            );
    }
}