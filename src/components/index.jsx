import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Visibility } from '../constants';
import { toggle } from '../actions';

class ToggleButton extends Component {
    render() {
        return (
            <div
                id={"widget"}
                className={Visibility.COLLAPSED.toLowerCase()}
                onClick={() => this.props.onToggleClick()}
                >
                <span style={{top: 5, position: "relative"}}>{"+"}</span>
            </div>
        );
    }
}


class WebChatWidget extends Component {
    render() {
        if (this.props.visibility == Visibility.COLLAPSED){
            return (<ToggleButton onToggleClick={this.props.onToggleClick}/>);
        } else if (this.props.visibility == Visibility.EXPANDED){
            return (<div id={"widget"} className={Visibility.EXPANDED.toLowerCase()}>{"Aquí va el chat"}</div>);
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

const WebChat = connect(mapStateToProps, mapDispatchToProps)(WebChatWidget);
export default WebChat;