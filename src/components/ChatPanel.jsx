import React from 'react';
import ReactDOM from 'react-dom';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import moment from 'moment';
import { Component } from 'react';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { lowerCase } from 'lodash/string';
import {
    Panel,
    Form,
    Button,
    Glyphicon
    } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DropfileField from 'react-dropfile-field';
import { add_message, logout, flush } from '../actions';
import { Strings } from '../constants';
import MessageList from './MessageList';


class DisconnectedMessageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
        };
    }

    componentDidMount() {
        this.setEnterKeyListener()
        if (this.state.files.length > 0) {
            $('.df-preview').parent().attr('class', 'chattigo-file-preview');
        }
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme()
        };
    }

    setEnterKeyListener() {
        const message_textarea = findDOMNode(this.refs.message);

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
        const message_textarea = $(findDOMNode(this.refs.message)).find('textarea').first()[0];
        let name = null;
        try {
            name = this.props.session[lowerCase(this.context.settings.name_field)] || Strings.ANONYMOUS;
        } catch (e) {
            name = Strings.ANONYMOUS;
        }
        if ((message_textarea.value !== "" && message_textarea.value !== null && message_textarea.value !== undefined) || this.state.files.length > 0){
            if (message_textarea.value === null || message_textarea.value === undefined) {
                message_textarea.value = "";
            }
            let message = {
                id: v4(),
                author: {
                    id: this.props.session.user,
                    name: name
                },
                timestamp: moment().valueOf(),
                origin: "customer",
                type: "text",
                content: message_textarea.value
            };
            if (this.state.files.length > 0) {
                message = Object.assign({}, message, { files: this.state.files });
            }
            $(findDOMNode(this.refs.message)).find('textarea').each((index, element) => {
                element.value = '';
            });
            this.refs.dropfilefield.clearFiles();
            this.props.onAddMessage(message, this.context.settings);
        }
    }

    onDrop(e, files) {
        this.setState({ files: files });
    }

    onFileClear(e) {
        this.setState({ files: [] });
    }

    toggleFileInput(e) {
        e.preventDefault();
        this.refs.dropfilefield.toggleInput();
    }

    render() {
        const iconClassNamesByExtension = {
            'text':    'icon-file-text',
            'doc':     'icon-file-word',
            'xls':     'icon-file-excel',
            'xlsx':    'icon-file-excel',
            'ppt':     'icon-file-play',
            'pptx':    'icon-file-play',
            'pdf':     'icon-file-pdf',
            'default': 'icon-file-text'
        }
        const textfield = (
            <TextField
                style={{ width: '100%'}}
                rows={1}
                ref="message"
                rowsMax={2}
                hintText=""
                floatingLabelText={Strings.PLACEHOLDER_MESSAGE}
                floatingLabelFixed={true}
                multiLine={true} />
                );
        const previewStyle = {
        };
        const dropzone = (
            <div id="chattigo-dropfilefield" style={{ width: '80%'}}>
                <DropfileField
                    ref='dropfilefield'
                    textField={textfield}
                    onDrop={this.onDrop.bind(this)}
                    onFileClear={this.onFileClear.bind(this)}
                    previewImageStyle={previewStyle}
                    previewIconStyle={previewStyle}
                    iconClassNamesByExtension ={iconClassNamesByExtension}
                    maxFileCount={3} />
            </div>
            );
        const attach = (
            <IconButton
                style={{padding: 0}}
                className="chattigo-icon-button"
                tooltip={Strings.ATTACH_FILE}
                onClick={(e) => this.toggleFileInput(e)} >
                <FontIcon className="material-icons">attach_file</FontIcon>
            </IconButton>
        );
        return (
            <Form inline>
                <div id={"chattigo-message-form"}>
                    {dropzone}
                    {attach}
                    <IconButton
                        style={{padding: 0}}
                        className="chattigo-icon-button"
                        tooltip={Strings.SEND}
                        onClick={(e) => this.sendHandler(e)} >
                        <FontIcon className="material-icons">send</FontIcon>
                    </IconButton>
                </div>
            </Form>
            );
    }
}
DisconnectedMessageForm.contextTypes = { settings: React.PropTypes.object };
DisconnectedMessageForm.childContextTypes = { muiTheme: React.PropTypes.object };

const mapStateToProps = (state) => {
    return {
        session: state.session
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddMessage: (message, settings) => {
            settings.api.send(message).then((response) => {
                if (process.env.NODE_ENV !== "production") {
                    if (response.message.attachments)
                        console.log("ChatPanel: mapDispatchToProps: response.message.attachments[0]:", response.message.attachments[0]);
                }
                dispatch(add_message(response.message));
            }).catch((response) => {
                console.error('Send message:', response);
            });
        }
    };
};

const MessageForm = connect(mapStateToProps, mapDispatchToProps)(DisconnectedMessageForm);


class DisconnectedLogout extends Component {

    getChildContext() {
        return {
            muiTheme: getMuiTheme()
        };
    }

    logoutHandler (e) {
        e.preventDefault();
        this.props.logout(this.context.settings, this.props.user);
    }

    render() {
        return (
            <FlatButton
                id="chattigo-logout"
                label={Strings.LOGOUT}
                onClick={(e) => this.logoutHandler(e)}
                icon={<FontIcon className="material-icons">exit_to_app</FontIcon>}
                style={{
                    color: this.context.settings.send_color,
                    backgroundColor: this.context.settings.send_background_color
                }}
                />
            );
    }
}
DisconnectedLogout.contextTypes = { settings: React.PropTypes.object };
DisconnectedLogout.childContextTypes = { muiTheme: React.PropTypes.object };

const mapLogoutStateToProps = (state) => {
    return {
        user: (settings) => ({
            id: state.session.user,
            name: state.session[lowerCase(settings.name_field)]
        })
    }
}

const mapLogoutDispatchToProps = (dispatch) => {
    return {
        logout: (settings, user) => {
            const message = {
                id: v4(),
                author: user(settings),
                logout: true,
                timestamp: moment().valueOf(),
                origin: "customer",
                type: "text",
                content: Strings.CLIENT_LOGGED_OUT
            };
            settings.api.send(message).then((response) => {
                settings.providers.messages.stop();
                dispatch(logout());
                if (!settings.preserve_history) {
                    dispatch(flush());
                }
            }).catch((response) => {
                // console.error('Login:', response);
            });
        }
    };
};

const Logout = connect(mapLogoutStateToProps, mapLogoutDispatchToProps)(DisconnectedLogout);

export default class ChatPanel extends Component {
    render() {
        return (
            <div style={{ height: '100%' }} >
                <MessageList/>
                <MessageForm/>
                <Logout/>
            </div>
            );
    }
}
