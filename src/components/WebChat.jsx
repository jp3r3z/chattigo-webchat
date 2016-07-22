import classNames from 'classnames';
import React from 'react';
import moment from 'moment';
import { v4 } from 'node-uuid';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Button, Glyphicon } from 'react-bootstrap';
import { lowerCase } from 'lodash/string';
import { Visibility, Strings } from '../constants';
import { toggle } from '../actions';
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
        return (
            <div>
                {this.context.settings.header_text}
                {this.renderButton(
                    this.props.toggle,
                    classNames('chattigo-top-bar-btn', 'chattigo-toggle-collapse'),
                    'chevron-down')}
            </div>
        );
    }
}
Header.contextTypes = { settings: React.PropTypes.object };



const mapDispatchToProps = (dispatch) => {
    return {
        toggle: () => {
            dispatch(toggle());
        }
    };
};

Header = connect(null,mapDispatchToProps)(Header);

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