import 'babel-polyfill';
import React from 'react';
import moment from 'moment';
import { v4 } from 'node-uuid';
import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { lowerCase } from 'lodash/string';
import {
    Panel,
    Button,
    FormGroup,
    FormControl
    } from 'react-bootstrap';
import ClientJS from 'clientjs';
import { Strings } from '../constants';
import { login } from '../actions';
import DynForm from './DynForm';


class LoginForm extends Component {
    grabData (e) {
        e.preventDefault();
        let data = this.refs.form.getValue();
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
                <DynForm
                    fields={this.context.settings.login_fields}
                    onSubmit={(e) => this.grabData(e)}
                    defaults={this.props.session}
                    ref='form'
                    submit_text={this.context.settings.login_text}
                    />
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

const getClientInfo = (provider) => {
    return new Promise((resolve, reject) => {
        /* GEOLOCATION */
        const client = new ClientJS();
        let geolocation = null;
        if ("geolocation" in navigator) {
            const getPosition = (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                provider.get(lat, lon).then((response) => {
                    geolocation = response.body;
                    resolve(Object.assign({}, client.getResult(), { geolocation: geolocation }))
                }).catch((response) => {
                    geolocation = Strings.GEOLOCATION_REVERSE_GEOCODING_ERROR(response);
                    resolve(Object.assign({}, client.getResult(), { geolocation: geolocation }))
                });
            };
            const positionError = (error) => {
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        geolocation = Strings.GEOLOCATION_PERMISSION_DENIED;
                        resolve(Object.assign({}, client.getResult(), { geolocation: geolocation }))
                        break;
                    case error.POSITION_UNAVAILABLE:
                        geolocation = Strings.GEOLOCATION_POSITION_UNAVAILABLE;
                        resolve(Object.assign({}, client.getResult(), { geolocation: geolocation }))
                        break;
                    case error.TIMEOUT:
                        geolocation = Strings.GEOLOCATION_TIMEOUT;
                        resolve(Object.assign({}, client.getResult(), { geolocation: geolocation }))
                        break;
                    case error.UNKNOWN_ERROR:
                        geolocation = Strings.GEOLOCATION_UNKNOWN_ERROR(error.message);
                        resolve(Object.assign({}, client.getResult(), { geolocation: geolocation }))
                        break;
                    default:
                        geolocation = Strings.GEOLOCATION_UNKNOWN_ERROR(error.message);
                        resolve(Object.assign({}, client.getResult(), { geolocation: geolocation }))
                        break;
                }
            };
            navigator.geolocation.getCurrentPosition(getPosition, positionError);
        } else {
            geolocation = Strings.GEOLOCATION_NOT_AVAILABLE;
            resolve(Object.assign({}, client.getResult(), { geolocation: geolocation }))
        }
    });
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (data, settings) => {
            getClientInfo(settings.providers.reverseGeocoding).then((clientInfo) => {
                const message = {
                    id: v4(),
                    new_session: true,
                    client: clientInfo,
                    login_form: data,
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
                    settings.providers.messages.run(data, dispatch);
                }).catch((response) => {
                    // console.error('Login:', response);
                });
            });
        }
    };
};

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default Login;