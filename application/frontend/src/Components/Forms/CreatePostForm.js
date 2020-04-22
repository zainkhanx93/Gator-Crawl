import React from 'react';
import { Field, reduxForm } from 'redux-form';

import './LoginForm.css';

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

  renderSelect = ({
    input,
    label,
    type,
    meta,
    children
  }) => {
    return (
      <div>
        <select {...input} className="selectfield">
          {children}
        </select>
        {this.renderError(meta)}
      </div>
    );
  }

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="errormessage">
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
        <Field name="categoryId" component={this.renderSelect} label="Category">
          <option name="">Choose A Category</option>
          <option value="1" name="1">Books</option>
          <option value="2" name="2">Clothing</option>
          <option value="3" name="3">Electronics</option>
          <option value="4" name="4">Furniture</option>
          <option value="5" name="5">School Supplies</option>
        </Field>
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
    errors.productName = 'You must enter a name for your product';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  if (!formValues.price) {
    errors.price = 'You must enter a price';
  }

  if (!formValues.categoryId || formValues.categoryId === 'Choose A Category') {
    errors.categoryId = 'You must select a category';
  }


  return errors;
};


export default reduxForm({
  form: 'createPostForm',
  validate
})(CreatePostForm);
