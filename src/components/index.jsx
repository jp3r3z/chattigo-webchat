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

    stripScripts(s) {
        var div = document.createElement('div');
        div.innerHTML = s;
        var scripts = div.getElementsByTagName('script');
        var i = scripts.length;
        while (i--) {
          scripts[i].parentNode.removeChild(scripts[i]);
        }
        return div.innerHTML;
    }

    render() {
        const settings  = this.context.settings;
        let image = <Image src={require("../assets/images/chattigo-icon.png")} responsive />;
        if (settings.toggle_button_image !== null && settings.toggle_button_image !== false && settings.toggle_button_image !== "") {
            if (validator.isURL(settings.toggle_button_image)) {
                image = <Image src={settings.toggle_button_image} responsive />;
            }
            if (startsWith('glyphicon', settings.toggle_button_image)) {
                image = <Glyphicon glyph={settings.toggle_button_image.slice(9)} bsSize={"small"}/>;
            }
        }
        const button = this.context.settings.toggle_button === null || this.context.settings.toggle_button === undefined ? (
            <Button
                className={Visibility.COLLAPSED.toLowerCase()+" not-custom"}
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
        ) : (
            <div
                className={Visibility.COLLAPSED.toLowerCase()+" custom"}
                onClick={() => this.props.onToggleClick()}
                id={"chattigo-widget"}
                dangerouslySetInnerHTML={{__html: this.stripScripts(this.context.settings.toggle_button)}}
                />
        );

        return button;
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
