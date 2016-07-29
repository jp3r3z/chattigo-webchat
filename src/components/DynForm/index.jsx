import 'babel-polyfill';
import React from 'react';
import { Component } from 'react';
import { Button } from 'react-bootstrap';
import Field from './Field';
import { lowerCase } from 'lodash/string';
import { Strings } from '../../constants';

class DynForm extends Component {

    getValue() {
        let value = {};
        for (let field in this.refs) {
            let new_value = {};
            new_value[lowerCase(this.refs[field].getName())] = this.refs[field].getValue(); 
            value = Object.assign(value, new_value);
        }
        return value;
    }

    validate() {
        let validationErrors = [];
        for (let field in this.refs) {
            try {
                this.refs[field].validate();
            } catch (validationError) {
                if (validationError instanceof Error) {
                    validationErrors.push(validationError.message);
                } else if (typeof validationError === 'string') {
                    validationErrors.push(validationError);
                }
            }
        }
        if (validationErrors.length == 0){
            return true;
        } else {
            throw validationErrors;
        }
    }

    clickHandler (e) {
        e.preventDefault();
        try {
            this.validate();
            this.props.onSubmit(e);
        } catch (validationError) {
            let message = Strings.FORM_ERRORS + ":";
            console.log(validationError)
            for (let error of validationError) {
                message += "\n\n    *  " + error;
            }
            message += "\n";
            alert(message);
        }
    }

    render() {
        const style = {
            height: this.context.settings.height * 0.45,
            marginBottom: this.context.settings.height * 0.45 * 0.05
        };
        return (
            <form>
                <div id='chattigo-form-fields' style={style}>
                {this.props.fields.map(field => {
                    let key = field;
                    if (typeof key === 'object') {
                        key = field.label;
                    }
                    const value = this.props.defaults[lowerCase(key)];
                    const default_value = value === 'undefined' ? '' : value;
                    return <Field key={key} ref={key} field={field} default={default_value}/>;
                })}
                </div>
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
DynForm.contextTypes = { settings: React.PropTypes.object };
export default DynForm;