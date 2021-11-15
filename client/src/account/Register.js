import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {accountService, alertService} from '@/_services';

const Register = ({history}) => {
  document.title = "Eigopost - Sign Up"
  const user = accountService.userValue;
  const initialValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  };
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required('Please enter a username'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Please enter an email address'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Please enter a password'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please reenter your password'),
    acceptTerms: Yup.bool()
      .oneOf([true], 'Please accept terms and conditions')
  });
  function onSubmit(fields, {setStatus, setSubmitting}) {
    setStatus();
    accountService.register(fields)
    .then(() => {
      alertService.success('Fantastic! Please check your email to verify your account', { keepAfterRouteChange: true });
      history.push('login');
    })
    .catch(error => {
      setSubmitting(false);
      alertService.error(error);
    });
  }

  if(user){
    return <Redirect to={{pathname: '/posts'}} />
  }
    return(
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <h3 className="accounts-form-title">Create an account</h3>
          <div className='accounts-form-login'>Already have an account?
            <Link to="/account/login"
                  className="account-link"> Sign in</Link>
          </div>
          <div className="card-body">
              <div className="form-row">
                <div className="mb-3 col-5">
                  <label>Username</label>
                  <Field name="userName"
                         type="text"
                         className={'form-control' +
                         (errors.userName && touched.userName ? ' is-invalid' : '')} />
                  <ErrorMessage name="userName"
                                component="div"
                                className="invalid-feedback" />
                </div>
              </div>
              <div className="mb-3">
                <label>Email</label>
                <Field name="email"
                       type="text"
                       className={'form-control'+
                       (errors.email && touched.email ? ' is-invalid' : '')} />
                <ErrorMessage name="email"
                              component="div"
                              className="invalid-feedback" />
              </div>
              <div className="form-row">
                <div className="mb-3 col">
                  <label>Password</label>
                  <Field name="password"
                         type="password"
                         className={'form-control'+
                         (errors.password && touched.password ? ' is-invalid' : '')} />
                  <ErrorMessage name="password"
                                component="div"
                                className="invalid-feedback" />
                </div>
                <div className="mb-3 col">
                  <label>Confirm Password</label>
                  <Field name="confirmPassword"
                         type="password"
                         className={'form-control'+
                         (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                  <ErrorMessage name="confirmPassword"
                                component="div"
                                className="invalid-feedback" />
                </div>
              </div>
              <div className="mb-3 form-check">
                  <Field type="checkbox"
                         name="acceptTerms"
                         id="acceptTerms"
                         className={'form-check-input ' +
                         (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                  <label>
                    <Link to="/terms"
                          className="account-terms"
                          target="_blank"
                          rel="noopener noreferrer">
                      Accept Terms & Conditions
                    </Link>
                  </label>
                  <ErrorMessage name="acceptTerms"
                                component="div"
                                className="invalid-feedback" />
              </div>
              <div className="mb-3">
                  <button type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary">
                      {isSubmitting &&
                      <span className="ep-spinner ep-spinner-sm mr-1"></span>}
                      Create Account
                  </button>
              </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
export {Register};
