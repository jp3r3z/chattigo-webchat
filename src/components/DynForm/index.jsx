import 'babel-polyfill';
import React from 'react';
import { Component } from 'react';
import { kebabCase } from 'lodash/string';
import { Button } from 'react-bootstrap';
import Field from './Field';

class DynForm extends Component {

    getValue() {
        let value = {};
        for (let field in this.refs) {
            let new_value = {};
            new_value[this.refs[field].getName()] = this.refs[field].getValue(); 
            value = Object.assign(value, new_value);
        }
        return value;
    }

    clickHandler (e) {
        e.preventDefault();
        console.log('DynForm', 'clickHandler()');
        this.props.onSubmit(e);
    }

    render() {
        return (
            <form>
                {this.props.fields.map(field => {
                    let key = field
                    if (typeof key === 'object') {
                        key = field.label
                    }
                    const value = this.props.defaults[kebabCase(key)];
                    const default_value = value === 'undefined' ? '' : value;
                    return <Field key={key} ref={key} field={field} default={default_value}/>;
                })}
                <Button
                    type="submit"
                    onClick={(e) => this.clickHandler(e)}
                    >
                    {this.props.submit_text}
                </Button>
            </form>
            );
    }
}
export default DynForm;