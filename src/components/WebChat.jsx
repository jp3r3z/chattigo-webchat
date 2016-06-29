import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Button, Glyphicon } from 'react-bootstrap';
import { Visibility } from '../constants';
import { toggle } from '../actions';
import Chat from './Chat';

class Header extends Component {
    renderButton() {
        var icon = 'chevron-down';
        return (
            <Button
                bsStyle="link"
                onClick={this.props.toggle}>
                <Glyphicon glyph={icon} /> {' '}
            </Button>
        );
    }
    render(){
        return <div>{this.context.settings.header_text}{this.renderButton()}</div>;
    }
}
Header.contextTypes = { settings: React.PropTypes.object };

const mapDispatchToProps = (dispatch) => {
    return {
        toggle: () => {
            dispatch(toggle())
        }
    };
};

Header = connect((state) => ({}),mapDispatchToProps)(Header);

export default class WebChat extends Component {
    render() {
        let header = <Header/>;
        return (
            <Panel header={header} className={Visibility.EXPANDED.toLowerCase()}>
                <Chat/>
            </Panel>
        );
    }
}