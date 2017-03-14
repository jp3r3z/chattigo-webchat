import 'babel-polyfill';
import React from 'react';
import { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import Field from './Field';
import { lowerCase } from 'lodash/string';
import { Strings } from '../../constants';

class DynForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

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
        this.setState({ loading: true }, () => {
            try {
                this.validate();
                this.props.onSubmit();
            } catch (validationError) {
                let message = Strings.FORM_ERRORS + ":";
                console.log(validationError)
                for (let error of validationError) {
                    message += "\n\n    *  " + error;
                }
                message += "\n";
                alert(message);
                this.setState({ loading: false });
            }
        });
    }

    render() {
        const style = {
            marginBottom: this.context.settings.height * 0.45 * 0.05
        };
        return (
            <Panel id="chattigo-login-form-panel">
                <p>{this.context.settings.welcome_text}</p>
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
                        disabled={this.state.loading}
                        onClick={!this.state.loading ? (e) => this.clickHandler(e) : null}
                        >
                        {this.state.loading ? Strings.LOADING : this.props.submit_text}
                    </Button>
                </form>
            </Panel>

            );
    }
}
DynForm.contextTypes = { settings: React.PropTypes.object };
export default DynForm;
