/* ./index.jsx
 * Entry point for chattigo-webchat client
 */
require('./assets/stylesheets/style.sass');
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import WebChat from './components';
import { SETTINGS } from './constants';

class Chattigo {
    constructor (APIkey, settings = SETTINGS) {
        this.settings = Object.assign({}, { APIkey: APIkey }, SETTINGS, settings);
        this.store = configureStore();
        this.container = "chattigo-webchat-container";
    }
    init() {
        let chattigo = document.createElement("DIV");
        chattigo.id = this.container;
        document.getElementsByTagName('body')[0].appendChild(chattigo);
        render(
            (
                <Provider store={this.store} settings={this.settings}>
                    <WebChat/>
                </Provider>
            ),
            document.getElementById(this.container)
        );
    }
}
export default Chattigo;

// Bootstrap chattigo (for testing porpuses):
let chattigo = new Chattigo("dummyAPIKey");
chattigo.init();