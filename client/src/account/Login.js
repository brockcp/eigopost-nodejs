import React from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {accountService, alertService} from '@/_services';
import './Account.css';

const Login = () => {
  document.title = "Eigopost | Sign in"
  const user = accountService.userValue;
  const navigate = useNavigate();
  function onSubmit({email, password}, {setSubmitting}) {
    alertService.clear();
    accountService.login(email, password)
    .then(() => {
      navigate(-1);
    })
    .catch(error => {
      setSubmitting(false);
      alertService.error("Please make sure your email and password are correct.");
    });
  }
  if (user){
    return <Navigate replace to="/"/>;
  }
  return(
    <Formik initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Email is invalid')
                .required('Please enter your email address'),
              password: Yup.string()
                .required('Please enter your password')
            })}
            onSubmit={onSubmit}>
      {({ errors,
          touched,
          isSubmitting
        }) => (
        <Form>
          <div className="login">
            <h3 className="accounts-form-title">Sign in to your account</h3>
            <div className="accounts-form-login">Dont have an account?
              <Link to={'/account/register'}
                    className="account-link">
                 &emsp; Create account
              </Link>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Email</label>
                <Field name="email"
                       type="text"
                       className={'form-control'+(errors.email && touched.email ? ' is-invalid' : '')} />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <Field name="password"
                       type="password"
                       className={'form-control'+(errors.password && touched.password ? ' is-invalid' : '')} />
                <ErrorMessage name="password"
                              component="div"
                              className="invalid-feedback" />
              </div>
              <div className="form-group col">
                <button type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary">
                  {isSubmitting ? <span className="ep-spinner ep-spinner-sm mr-1"></span> : "Login"}
                </button>
                <Link to={"/account/forgot-password"}
                      className="account-forgot mt-2 ms-3">
                  Forgot Password
                </Link>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
export {Login};
