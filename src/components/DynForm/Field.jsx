import 'babel-polyfill';
import React from 'react';
import { Component } from 'react';
import StringField from './StringField';
import { FormFields } from '../../constants';

class Field extends Component {

    cleanField() {
        let field = null;
        if (typeof this.props.field === 'string') {
            field = Object.assign({},FormFields.defaults, { type: 'string', label: this.props.field });
        } else if (typeof this.props.field === 'object') {
            field = Object.assign({},FormFields.defaults, this.props.field);
        }
        return field;
    }

    getValue() {
        const field = this.cleanField();
        return this.refs[field.label].getValue();
    }

    getName() {
        const field = this.cleanField();
        return this.refs[field.label].getName();
    }

    render() {
        const field = this.cleanField();
        switch (field.type){
            case 'string':
                return <StringField ref={field.label} field={field} default={this.props.default}/>;
            default:
                return null;
        }
    }
}
export default Field;