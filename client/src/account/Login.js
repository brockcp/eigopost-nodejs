import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { accountService, alertService } from '@/_services';

function Login({ history }){
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
        password: Yup.string().required('Please enter your password')
    });
    function onSubmit({ email, password }, { setSubmitting }) {
        alertService.clear();
        accountService.login(email, password)
            .then(() => {
                history.goBack();
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
        <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h3 className="account-form-title">Sign in to your account</h3>
                    <div className="account-form-login">Dont have an account?
                      <Link to={'/account/register'} className="color-1d-link"> Create account</Link>
                    </div>
                     <div className="card-body">
                        <div className="form-group">
                            <label>Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                              {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                              Login
                          </button>
                          <Link to={"/account/forgot-password"} className="d-block pt-3 color-1d-link">Forgot Password</Link>
                        </div>
                      </div>
                </Form>
            )}
        </Formik>
    )
}

export { Login };
