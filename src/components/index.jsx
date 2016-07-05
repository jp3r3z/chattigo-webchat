import React from 'react';
import validator from 'validator';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon, Image } from 'react-bootstrap';
import { startsWith } from 'lodash/string';
import { Visibility } from '../constants';
import { toggle } from '../actions';
import WebChat from './WebChat'

class ToggleButton extends Component {
    render() {
        const settings  = this.context.settings;
        let image = <Image src={require("../assets/images/chattigo-icon.png")} responsive />;
        if (settings.toggle_button_image !== null && settings.toggle_button_image !== false && settings.toggle_button_image !== "") {
            if (validator.isURL(settings.toggle_button_image)) {
                image = <Image src={settings.toggle_button_image} responsive />;
            }
            if (_.startsWith('glyphicon', settings.toggle_button_image)) {
                image = <Glyphicon glyph={settings.toggle_button_image.slice(9)} bsSize={"small"}/>;
            }
        }
        return (
            <Button
                className={Visibility.COLLAPSED.toLowerCase()}
                onClick={() => this.props.onToggleClick()}
                bsSize={"small"}
                id={"chattigo-widget"}
                style={
                    {
                        color: this.context.settings.toggle_color,
                        backgroundColor: this.context.settings.toggle_background_color
                    }}
                >
                {image}
            </Button>
        );
    }
}
ToggleButton.contextTypes = { settings: React.PropTypes.object };


class WebChatWidget extends Component {
    render() {
        if (this.props.visibility == Visibility.COLLAPSED){
            return (<ToggleButton  onToggleClick={this.props.onToggleClick}/>);
        } else if (this.props.visibility == Visibility.EXPANDED){
            return (<WebChat/>);
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        visibility: state.visibility
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleClick: () => {
            dispatch(toggle())
        }
    };
};

const ChattigoWebChat = connect(mapStateToProps, mapDispatchToProps)(WebChatWidget);
export default ChattigoWebChat;