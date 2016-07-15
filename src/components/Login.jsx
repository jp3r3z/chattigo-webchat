import 'babel-polyfill';
import React from 'react';
import moment from 'moment';
import { v4 } from 'node-uuid';
import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import {
    Panel,
    Button,
    FormGroup,
    FormControl
    } from 'react-bootstrap';
import { Strings } from '../constants';
import { kebabCase, lowerCase } from 'lodash/string';
import { login } from '../actions';


class LoginForm extends Component {
    grabData (e) {
        e.preventDefault();
        let data = {};
        const fields = this.context.settings.login_fields
        fields.map(field => {
            let prop = {}
            prop[kebabCase(field)] = findDOMNode(this.refs[kebabCase(field)]).value;
            data = Object.assign(data, prop);
        });
        if (this.props.session.user)
            data = Object.assign(data, { user: this.props.session.user });
        else
            data = Object.assign(data, { user: v4() });
        this.props.onLogin(data, this.context.settings);
    }

    render(){
        return (
            <Panel>
                <p>{this.context.settings.welcome_text}</p>
                <form>
                    {this.context.settings.login_fields.map(field => {
                        return (
                            <FormGroup key={"chattigo-login-"+kebabCase(field)} controlId={"chattigo-login-"+kebabCase(field)}>
                                <FormControl defaultValue={this.props.session[kebabCase(field)]} type="text" ref={kebabCase(field)} placeholder={field} />
                            </FormGroup>
                            );
                    })}
                    <Button
                        type="submit"
                        onClick={(e) => this.grabData(e)}
                        >
                        {this.context.settings.login_text}
                    </Button>
                </form>
            </Panel>
        );
    }
}
LoginForm.contextTypes = { settings: React.PropTypes.object };

const mapStateToProps = (state) => {
    return {
        session: state.session
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (data, settings) => {
            const message = {
                id: v4(),
                new_session: true,
                author: {
                    id: data.user,
                    name: data[lowerCase(settings.name_field)] || Strings.ANONYMOUS
                },
                timestamp: moment().valueOf(),
                origin: "customer",
                type: "text",
                content: JSON.stringify(data)
            };
            settings.api.send(message).then((response) => {
                dispatch(login(settings.login_fields, data));
                settings.provider.run(data, dispatch);
            }).catch((response) => {
                // console.error('Login:', response);
            });
        }
    };
};

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default Login;