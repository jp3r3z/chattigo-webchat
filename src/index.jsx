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
import configureStore from './configureStore';
import ChattigoWebChat from './components';
import { MessageProvider, ReverseGeocodingProvider } from './api';
import API from './api';
import { Strings, SETTINGS } from './constants';
import { logout, toggle } from './actions';

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
        const key = { APIkey: APIkey };
        const api = { api: new API(APIkey) };
        const providers = {
            providers: {
                messages: new MessageProvider(APIkey, api.api),
                reverseGeocoding: new ReverseGeocodingProvider()
            }
        };
        this.settings = Object.assign({}, key, api, providers, SETTINGS, settings);
        this.store = configureStore();
        this.container = "chattigo-webchat-container";
    }

    init() {
        if (this.settings.login_fields !== []) {
            if ($.inArray(this.settings.name_field, this.settings.login_fields) == -1) {
                throw new ConfigurationException(Strings.EXCEPTION_NAME_FIELD_MISSING);
            }
        }
        let chattigo = document.createElement("DIV");
        chattigo.id = this.container;
        document.getElementsByTagName('body')[0].appendChild(chattigo);
        injectTapEventPlugin();
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
