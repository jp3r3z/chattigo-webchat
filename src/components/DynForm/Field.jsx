import 'babel-polyfill';
import React from 'react';
import { Component } from 'react';
import StringField from './StringField';

class Field extends Component {

    componentWillMount() {
        if (typeof this.props.field === 'string') {
            this.field = { type: 'string', label: this.props.field };
        } else if (typeof this.props.field === 'object') {
            this.field = this.props.field;
        }
    }

    getValue() {
        return this.refs[this.field.label].getValue();
    }

    getName() {
        return this.refs[this.field.label].getName();
    }

    render() {
        switch (this.field.type){
            case 'string':
                return <StringField ref={this.field.label} field={this.field} default={this.props.default}/>;
            default:
                return null;
        }
    }
}
export default Field;