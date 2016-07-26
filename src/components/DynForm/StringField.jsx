import 'babel-polyfill';
import React from 'react';
import { Component } from 'react';
import { kebabCase } from 'lodash/string';
import { findDOMNode } from 'react-dom';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';


class StringField extends Component {

    getValue () {
        return findDOMNode(this.refs[kebabCase(this.props.field.label)]).value;
    }

    getName () {
        return this.props.field.label;
    }

    render () {
        const field = this.props.field;
        if ('choices' in field) {
            return (
                <FormGroup controlId={"chattigo-form-field-"+kebabCase(field.label)}>
                    <ControlLabel>{field.label}</ControlLabel>
                    <FormControl
                        componentClass="select"
                        placeholder={field.label}
                        ref={kebabCase(field.label)} >
                        {field.choices.map( choice => {
                                return <option key={choice} value={choice}>{choice}</option>;
                            }
                        )}
                    </FormControl>
                </FormGroup>
                );
        } else {
            return (
                <FormGroup controlId={"chattigo-form-field-"+kebabCase(field.label)}>
                    <FormControl
                        defaultValue={this.props.default}
                        type="text"
                        ref={kebabCase(field.label)}
                        placeholder={field.label} />
                </FormGroup>
                );
        }
    }
}
export default StringField;