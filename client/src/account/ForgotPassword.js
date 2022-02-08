import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { accountService, alertService } from '@/_services';

function ForgotPassword() {
  document.title = "Eigopost - Forgot Password"
  const navigate = useNavigate();
  const initialValues = {
    email: ''
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required')
  });
  function onSubmit({ email }, { setSubmitting }) {
    alertService.clear();
    accountService.forgotPassword(email)
    .then(() => {
      alertService.success('Please check your email for password reset instructions')
      navigate('/posts')
    })
    .catch(error => alertService.error(error))
    .finally(() => setSubmitting(false));
  }
  return (
    <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
      {({ errors,
          touched,
          isSubmitting
       }) => (
        <Form>
          <div className="forgot-password">
            <h3 className="accounts-form-title">Forgot Password</h3>
            <div className="card-body">
                <div className="form-group">
                  <label>Email</label>
                  <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </div>
                <div className="form-row">
                    <div className="form-group col">
                      <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="ep-spinner ep-spinner-sm mr-1"></span>}
                        Submit
                      </button>
                      <Link to="/account/login"
                            className="forgot-password-cancel ms-3">
                        Cancel
                      </Link>
                    </div>
                </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
    )
}

export { ForgotPassword };
