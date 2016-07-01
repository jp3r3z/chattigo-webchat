import React from 'react';
import { Component } from 'react';

export default class Message extends Component {
    render(){
        return (<div>{"Esto es un mensajito."}</div>);
    }
}
Message.contextTypes = { settings: React.PropTypes.object };