import React from 'react';
import { Field, reduxForm } from 'redux-form';

import './LoginForm.css';

class LoginForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    const { handleSubmit } = this.props;
    // console.log('button pressed');
    handleSubmit();
    // console.log(formValues);
  }

  renderInputField = ({
    input,
    label,
    type,
    meta
  }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    // console.log(className);
    console.table(input);
    return (
      <div className={className}>
        <input
          {...input}
          className="Input-Field"
          type={type}
          autoComplete="off"
          placeholder={label}
        />
        {this.renderError(meta)}
      </div>
    );
  }

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
    return (<div />);
  };

  render() {
    const {
      // error,
      // handleSubmit,
      pristine,
      // reset,
      submitting,
      invalid
    } = this.props;
    console.log(`${pristine} ${submitting} ${invalid}`);
    return (
      <form onSubmit={(e) => this.onSubmit(e)} className="ui form error">
        <Field name="email" type="email" component={this.renderInputField} label="Email" />
        <Field name="password" type="password" component={this.renderInputField} label="Password" />
        <a href="forgotpassword" className="Link">Forgot password?</a>
        {/* error && <strong>{error}</strong> */}
        <div>
          <button
            className="Button"
            type="submit"
            
          >
            <b>Login</b>
            {/* disabled={pristine || submitting || invalid} */}
          </button>
        </div>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.email) {
    // console.log('no email');
    errors.email = 'You must enter an email';
  } else if (formValues.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
    // console.log('not valid email');
    errors.email = 'Not a valid email';
  }

  if (!formValues.password) {
    // console.log('no password');
    errors.password = 'You must enter a password';
  }

  return errors;
};


export default reduxForm({
  form: 'LoginForm',
  validate
})(LoginForm);
