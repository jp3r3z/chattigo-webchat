import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import { Visibility } from '../constants';
import { toggle } from '../actions';
import WebChat from './WebChat'

class ToggleButton extends Component {
    render() {
        return (
            <Button
                id={"widget"}
                className={Visibility.COLLAPSED.toLowerCase()}
                onClick={() => this.props.onToggleClick()}
                bsSize={"small"}
                style={
                    {
                        color: this.context.settings.toggle_color,
                        backgroundColor: this.context.settings.toggle_background_color
                    }}
                >
                <Glyphicon glyph={"user"} bsSize={"small"}/>
            </Button>
        );
    }
}
ToggleButton.contextTypes = { settings: React.PropTypes.object };


class WebChatWidget extends Component {
    render() {
        if (this.props.visibility == Visibility.COLLAPSED){
            return (<ToggleButton onToggleClick={this.props.onToggleClick}/>);
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