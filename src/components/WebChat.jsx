import classNames from 'classnames';
import React from 'react';
import moment from 'moment';
import $ from 'jquery';
import { v4 } from 'uuid';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Button, Glyphicon } from 'react-bootstrap';
import { lowerCase } from 'lodash/string';
import { Visibility, Strings } from '../constants';
import { toggle } from '../actions';
import Chat from './Chat';

class Header extends Component {
    renderButton(onClickFunc, classname, icon) {
        const {header_icon_color} = this.context.settings;
        const style = header_icon_color === null || header_icon_color === undefined ?
            undefined : { color: header_icon_color };
        return (
            <Button
                bsStyle="link"
                onClick={onClickFunc}
                className={classname}
                style={style}
                >
                {' '}<Glyphicon glyph={icon} />
            </Button>
        );
    }
    render(){
        const {header_background_color, header_color} = this.context.settings;
        let style = {};
        style = Object.assign(
            {},
            style,
            header_background_color === undefined || header_background_color === null ?
             {} :
             {backgroundColor: header_background_color}
        );
        style = Object.assign(
            {},
            style,
            header_color === undefined || header_color === null ?
             {} :
             {color: header_color}
        );
        style = style === {} ? undefined : style;
        return (
            <div style={style}>
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

    componentDidMount() {
        const {header_background_color} = this.context.settings;
        if (header_background_color !== undefined && header_background_color !== null) {
            $("#chattigo-widget .panel-heading").css('background-color', header_background_color);
        }
    }

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
                <div className="chattigo-powered-by">
                    <span>powered by</span><span className="chattigo-powered-by-chattigo"> Chattigo</span>
                </div>
            </Panel>
        );
    }
}
WebChat.contextTypes = { settings: React.PropTypes.object };
