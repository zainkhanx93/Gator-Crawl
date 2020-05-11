import React from 'react';
import { Field, reduxForm } from 'redux-form';

import './LoginForm.css';

class CreatePostForm extends React.Component {
  onSubmit = (e) => {
    e.persist();
    // console.log('onsubmit');
    const { handleSubmit } = this.props;
    handleSubmit();
  };

  renderInputField = ({
    input,
    label,
    type,
    meta,
    icon
  }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <p style={{ color: '#662A82', fontWeight: 'bold' }}>{label}: </p>
        <div className="pricefield">
          <p style={{ display: 'inline' }}>{icon}</p>
          <input
            {...input}
            className="Input-Field"
            type={type}
            autoComplete="off"
            placeholder={label}
          />
        </div>
        {this.renderError(meta)}
      </div>
    );
  };

  renderTextArea = ({
    input, label, type, meta
  }) => {
    return (
      <div style={{ paddingBottom: '10px' }}>
        <p style={{ color: '#662A82', fontWeight: 'bold' }}>{label}: </p>
        <textarea
          {...input}
          className="Text-Area-Field"
          type={type}
          autoComplete="off"
          placeholder={label}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  renderSelect = ({
    input,
    label,
    // type,
    meta,
    children
  }) => {
    return (
      <div>
        <p style={{ color: '#662A82', fontWeight: 'bold' }}>{label}: </p>
        <select {...input} className="selectfield">
          {children}
        </select>
        {this.renderError(meta)}
      </div>
    );
  };

  renderFileUpload = ({
    input,
    label,
    type,
    meta,
    fileSelectedHandler
  }) => {
    return (
      <div>
        <p style={{ color: '#662A82', fontWeight: 'bold' }}>{label}: </p>
        <input
          // {...input}
          // className="Input-Field"
          type={type}
          // autoComplete="off"
          // placeholder={label}
          onChange={fileSelectedHandler}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="errormessage">
          <div className="header">{error}</div>
        </div>
      );
    }
    return <div />;
  };

  render() {
    const {
      // error,
      // handleSubmit,
      pristine,
      // reset,
      submitting,
      invalid,
      categories,
      fileSelectedHandler
    } = this.props;
    return (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <br />
        <h1>Enter Your Item Info</h1>
        <Field
          name="photo"
          type="file"
          component={this.renderFileUpload}
          label="Photo"
          fileSelectedHandler={fileSelectedHandler}
        />
        <Field
          name="productName"
          type="text"
          component={this.renderInputField}
          label="Product Name"
        />
        <Field
          name="description"
          component={this.renderTextArea}
          label="Description"
        />
        <Field
          name="price"
          type="text"
          component={this.renderInputField}
          label="Price"
          icon="$"
        />
        <Field name="categoryId" component={this.renderSelect} label="Category">
          <option name="">Choose A Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Field>
        {/* error && <strong>{error}</strong> */}
        <div>
          <button
            className="Login-Button"
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
  if (formValues.productName && formValues.productName.length > 30) {
    errors.productName = 'Product name is too long';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  if (!formValues.price) {
    errors.price = 'You must enter a price';
  } else if (+formValues.price !== parseInt(formValues.price, 10)) {
    errors.price = 'You must enter a numerical value';
  } else if (+formValues.price < 0) {
    errors.price = 'You must enter a positive value';
  }

  if (!formValues.categoryId || formValues.categoryId === 'Choose A Category') {
    errors.categoryId = 'You must select a category';
  }

  return errors;
};

export default reduxForm({
  form: 'createPostForm',
  validate,
})(CreatePostForm);
