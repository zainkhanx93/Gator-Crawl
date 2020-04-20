import React from 'react';
import { Field, reduxForm } from 'redux-form';

// import './LoginForm.css';

class CreatePostForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    // console.log('onsubmit');
    const { handleSubmit } = this.props;
    handleSubmit();
  }

  renderInputField = ({
    input,
    label,
    type,
    meta
  }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <input {...input} className="Input-Field" type={type} autoComplete="off" placeholder={label} />
        {this.renderError(meta)}
      </div>
    );
  };

  renderTextArea = ({
    input,
    label,
    type,
    meta
  }) => {
    return (
      <div>
        <textarea {...input} className="Text-Area-Field" type={type} autoComplete="off" placeholder={label} />
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
    return (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <br />
        <strong>Enter Your Item Info</strong>
        <br />
        <br />
        <Field name="productName" type="text" component={this.renderInputField} label="Product Name" />
        <Field name="description" component={this.renderTextArea} label="Description" />
        <Field name="price" type="text" component={this.renderInputField} label="Price" />
        {/* error && <strong>{error}</strong> */}
        <div>
          <button
            className="Button"
            type="submit"
            disabled={pristine || submitting || invalid}
          >
            <b>Create Post</b>
          </button>
        </div>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.productName) {
    errors.email = 'You must enter a name for your product';
  }

  if (!formValues.description) {
    errors.password = 'You must enter a description';
  }

  if (!formValues.price) {
    errors.password = 'You must enter a price';
  }


  return errors;
};


export default reduxForm({
  form: 'createPostForm',
  validate
})(CreatePostForm);
