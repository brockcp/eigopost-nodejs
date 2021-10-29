import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {accountService, alertService} from '@/_services';

const Login = ({history}) => {
  document.title = "Eigopost - Sign in"
  const user = accountService.userValue;
  const initialValues = {
    email: '',
    password: ''
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Please enter your email address'),
    password: Yup.string()
      .required('Please enter your password')
  });
  function onSubmit({email, password}, {setSubmitting}) {
    alertService.clear();
    accountService.login(email, password)
    .then(() => {
       history.push('/posts');
      //history.goBack(-1);
    })
    .catch(error => {
      setSubmitting(false);
      alertService.error("Oops. Something happened. Please try that again.");
    });
  }

  if(user){
    return <Redirect to={{pathname: '/posts'}} />
  }
  return(
    <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
      {({errors, touched, isSubmitting}) => (
        <Form>
          <h3 className="account-form-title">Sign in to your account</h3>
          <div className="account-form-login">Dont have an account?
            <Link to={'/account/register'}
                  className="account-link">
               &emsp; Create account
            </Link>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label>Email</label>
              <Field name="email"
                     type="text"
                     className={'form-control'+(errors.email && touched.email ? ' is-invalid' : '')} />
              <ErrorMessage name="email" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <Field name="password"
                     type="password"
                     className={'form-control'+(errors.password && touched.password ? ' is-invalid' : '')} />
              <ErrorMessage name="password"
                            component="div"
                            className="invalid-feedback" />
            </div>
            <div className="mb-3 col">
              <button type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary">
                {isSubmitting && <span className="ep-spinner ep-spinner-sm mr-1"></span>}
                  Login
              </button>
              <Link to={"/account/forgot-password"}
                    className="d-block account-forgot mt-2 ms-3">
                Forgot Password
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
export {Login};
