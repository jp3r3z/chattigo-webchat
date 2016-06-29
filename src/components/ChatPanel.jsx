import React from 'react';
import { Component } from 'react';
import {
    Panel,
    Button,
    FormGroup,
    FormControl
    } from 'react-bootstrap';
import { Strings } from '../constants';

export default class MessageList extends Component {
    render(){
        return <Panel/>;
    }
}

export default class MessageForm extends Component {
    render() {
        return (
            <form>
                <FormGroup controlId="formControlsTextarea">
                    <FormControl componentClass="textarea" placeholder={Strings.PLACEHOLDER_MESSAGE} />
                </FormGroup>
                <Button type="submit">
                    {this.context.settings.send_text}
                </Button>
            </form>
            );
    }
}
MessageForm.contextTypes = { settings: React.PropTypes.object };

export default class ChatPanel extends Component {
    render() {
        return (
            <div>
                <MessageList/>
                <MessageForm/>
            </div>
            );
    }
}