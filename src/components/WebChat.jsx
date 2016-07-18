import classNames from 'classnames';
import React from 'react';
import moment from 'moment';
import { v4 } from 'node-uuid';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Button, Glyphicon } from 'react-bootstrap';
import { Visibility, Strings } from '../constants';
import { toggle, logout, clear_chat } from '../actions';
import Chat from './Chat';

class Header extends Component {
    renderButton(onClickFunc, classname, icon) {
        return (
            <Button
                bsStyle="link"
                onClick={onClickFunc}
                className={classname}
                >
                {' '}<Glyphicon glyph={icon} /> 
            </Button>
        );
    }
    render(){
        let logout = null;
        if (this.props.is_loggedin) {
            logout = this.renderButton(
                (()=> this.props.logout(this.context.settings, this.props.user)),
                classNames('chattigo-top-bar-btn', 'chattigo-logout'),
                'log-out');
        }
        return (
            <div>
                {this.context.settings.header_text}
                {this.renderButton(
                    this.props.toggle,
                    classNames('chattigo-top-bar-btn', 'chattigo-toggle-collapse'),
                    'chevron-down')}
                {logout}
            </div>
        );
    }
}
Header.contextTypes = { settings: React.PropTypes.object };

const mapStateToProps = (state) => {
    return {
        is_loggedin: state.session.is_loggedin
        user: (settings) => ({
            id: state.session.user,
            name: state.session[lowerCase(settings.name_field)]
        })
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggle: () => {
            dispatch(toggle());
        },
        logout: (settings, user) => {
            const message = {
                id: v4(),
                author: user(settings),
                timestamp: moment().valueOf(),
                origin: "customer",
                type: "text",
                content: Strings.CLIENT_LOGGED_OUT
            };
            settings.api.send(message).then((response) => {
                settings.provider.stop();
                dispatch(clear_chat());
                dispatch(logout());
            }).catch((response) => {
                // console.error('Login:', response);
            });
        }
    };
};

Header = connect(mapStateToProps,mapDispatchToProps)(Header);

export default class WebChat extends Component {
    render() {
        let header = <Header/>;
        return (
            <Panel
                header={header}
                id={"chattigo-widget"}
                className={Visibility.EXPANDED.toLowerCase()}
                style={{
                    width: this.context.settings.width,
                    height: this.context.settings.height
                }}
                >
                <Chat/>
            </Panel>
        );
    }
}
WebChat.contextTypes = { settings: React.PropTypes.object };