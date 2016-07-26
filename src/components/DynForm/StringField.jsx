import 'babel-polyfill';
import React from 'react';
import { Component } from 'react';
import { kebabCase } from 'lodash/string';
import { findDOMNode } from 'react-dom';
import { FormGroup, FormControl } from 'react-bootstrap';


class StringField extends Component {

    getValue () {
        return findDOMNode(this.refs[kebabCase(this.props.field.label)]).value;
    }

    getName () {
        return this.props.field.label;
    }

    render () {
        const field = this.props.field;
        return (
            <FormGroup controlId={"chattigo-form-"+kebabCase(field.label)}>
                <FormControl
                    defaultValue={this.props.default}
                    type="text"
                    ref={kebabCase(field.label)}
                    placeholder={field.label} />
            </FormGroup>
            );
    }
}

export default StringField;