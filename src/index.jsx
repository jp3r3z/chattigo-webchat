/* ./index.jsx
 * Entry point for chattigo-webchat client
 */
import 'bootstrap-loader';
require('./assets/stylesheets/style.sass');
require('./assets/custom-scrollbar/jquery.mCustomScrollbar.min.css');
import $ from 'jquery';
import 'babel-polyfill';
import React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import ChattigoWebChat from './components';
import { SETTINGS } from './constants';

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


class Chattigo {
    constructor (APIkey, settings = SETTINGS) {
        this.settings = Object.assign({}, { APIkey: APIkey }, SETTINGS, settings);
        this.store = configureStore();
        this.container = "chattigo-webchat-container";
    }
    init() {
        require('./assets/custom-scrollbar/jquery.mCustomScrollbar.concat.min.js')($);
        let chattigo = document.createElement("DIV");
        chattigo.id = this.container;
        document.getElementsByTagName('body')[0].appendChild(chattigo);
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