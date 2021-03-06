/* ./index.jsx
 * Entry point for chattigo-webchat client
 */
import 'bootstrap-loader';
require('./assets/stylesheets/style.sass');
import $ from 'jquery';
import 'babel-polyfill';
import React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { lowerCase } from 'lodash/string';
import moment from 'moment';
import configureStore from './configureStore';
import ChattigoWebChat from './components';
import { MessageProvider, ReverseGeocodingProvider } from './api';
import API from './api';
import { Strings, SETTINGS } from './constants';
import { toggle, collapse, expand, logout, clear_chat, flush } from './actions';

class SettingsProvider extends Component {

    getChildContext() {
        return { settings: this.props.settings };
    }

    render() {
        return this.props.children;
    }
}
SettingsProvider.childContextTypes = {
    settings: React.PropTypes.object
};


class ConfigurationException {

    constructor(cause, message=Strings.EXCEPTION_CHECK_CONFIG) {
        this.name = "ConfigurationException";
        this.cause = cause;
        this.message = message;
    }

    toString() {
        return this.name + ": " + this.cause + " " + this.message;
    };
}


class Chattigo {

    constructor (APIkey, settings = SETTINGS) {
        this.container = "chattigo-webchat-container";
        this._setup(APIkey, settings);
        injectTapEventPlugin();
    }

    _setup(APIkey, settings) {
        const key = { APIkey: APIkey };
        const api = { api: new API(APIkey) };
        const providers = {
            providers: {
                messages: new MessageProvider(APIkey, api.api),
                reverseGeocoding: new ReverseGeocodingProvider()
            }
        };
        this.settings = Object.assign({}, key, api, providers, SETTINGS, settings);
        let login_labels = this.settings.login_fields.map((field) => {
            if (typeof field === "string") {
                return lowerCase(field);
            } else if (typeof field === "object") {
                return lowerCase(field.label);
            }
        });
        this.settings = Object.assign({}, this.settings, {login_labels: login_labels});
        this.store = configureStore();
    }

    update(settings) {
        this.settings = Object.assign({}, this.settings, settings);
        const selector = "#"+this.container;
        $(selector).remove();
        this.init();
    }

    overwrite(settings) {
        this._setup(this.settings.APIkey, settings);
        const selector = "#"+this.container;
        $(selector).remove();
        this.init();
    }

    toggle() {
        this.store.dispatch(toggle());
    }

    collapse() {
        this.store.dispatch(collapse());
    }

    expand() {
        this.store.dispatch(expand());
    }

    logout() {
        const state = this.store.getState();
        if (state.session.is_loggedin) {
            const message = {
                id: v4(),
                author: {
                    id: state.session.user,
                    name: state.session[lowerCase(this.settings.name_field)]
                },
                logout: true,
                timestamp: moment().valueOf(),
                origin: "customer",
                type: "text",
                content: Strings.CLIENT_LOGGED_OUT
            };
            this.settings.api.send(message).then((response) => {
                this.settings.providers.messages.stop();
                this.store.dispatch(logout());
                if (!this.settings.preserve_history) {
                    this.store.dispatch(flush());
                }
            }).catch((response) => {
                console.error('Logout:', response);
            });
        }
    }

    clear_chat() {
        this.store.dispatch(clear_chat());
    }

    flush() {
        this.store.dispatch(flush());
    }

    init() {
        const hasName = (name_field, login_fields) => {
            if (login_fields.length !== 0) {
                return login_fields.map((field) => {
                    return field === name_field || field.label === name_field;
                }).reduce((l, r) => (l || r), false);
            } else {
                return false;
            }
        };
        if (this.settings.login_fields.length !== 0) {
            if (! hasName(this.settings.name_field, this.settings.login_fields)) {
                throw new ConfigurationException(Strings.EXCEPTION_NAME_FIELD_MISSING);
            }
        } else {
            this.settings.name_field = null;
        }
        let chattigo = document.createElement("DIV");
        chattigo.id = this.container;
        document.getElementsByTagName('body')[0].appendChild(chattigo);
        if (this.settings.initial_open_state) {
            if (this.settings.initial_open_state.toUpperCase() === 'EXPANDED') {
                this.store.dispatch(expand());
            } else if (this.settings.initial_open_state.toUpperCase() === 'COLLAPSED') {
                this.store.dispatch(collapse());
            }
        }
        if (!this.settings.preserve_history) {
            this.store.dispatch(flush());
        }
        const state = this.store.getState();
        if (state.session.is_loggedin) {
            let user = {};
            for (let label of this.settings.login_labels) {
                user[label] = state.session[label];
            }
            user = Object.assign({}, user, { user: state.session.user});
            this.settings.providers.messages.run(user, this.store.dispatch);
        }
        render(
            (
                <Provider store={this.store}>
                    <SettingsProvider settings={this.settings}>
                        <ChattigoWebChat/>
                    </SettingsProvider>
                </Provider>
            ),
            document.getElementById(this.container)
        );
    }
}
export default Chattigo;

window.Chattigo = Chattigo;
