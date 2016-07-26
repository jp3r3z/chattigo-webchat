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
        this.props.onSubmit(e);
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
                    const value = this.props.defaults[kebabCase(key)];
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