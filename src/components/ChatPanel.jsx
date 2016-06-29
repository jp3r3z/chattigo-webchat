import React from 'react';
import { Component } from 'react';
import {
    Panel,
    Form,
    Button,
    FormGroup,
    FormControl,
    Glyphicon
    } from 'react-bootstrap';
import { Strings } from '../constants';

export default class MessageList extends Component {
    render(){
        return (
            <Panel
                id={"chattigo-message-list"}
                style={{
                    height: this.context.settings.height * 0.63
                }}
                />
            );
    }
}
MessageList.contextTypes = { settings: React.PropTypes.object };

export default class MessageForm extends Component {
    sendHandler (e) {
        e.preventDefault();
        alert("El envío de mensajes no está habilitado todavía.");
    }
    render() {
        return (
            <Form inline>
                <div id={"chattigo-message-form"}>
                    <FormGroup controlId="formControlsTextarea">
                        <FormControl componentClass="textarea" placeholder={Strings.PLACEHOLDER_MESSAGE} />
                    </FormGroup>
                    <Button
                        type="submit"
                        onClick={this.sendHandler}
                        >
                        <Glyphicon glyph={"send"} />
                    </Button>
                </div>
            </Form>
            );
    }
}
MessageForm.contextTypes = { settings: React.PropTypes.object };

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