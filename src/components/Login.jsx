import 'babel-polyfill';
import React from 'react';
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
import { kebabCase } from 'lodash/string';
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
        this.props.onLogin(fields, data);
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
        onLogin: (fields, data) => {
            dispatch(login(fields, data))
        }
    };
};

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default Login;