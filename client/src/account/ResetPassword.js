import React, { useState, useEffect } from 'react';
import { Link, useNavigate , useLocation} from 'react-router-dom';
import queryString from 'query-string';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { accountService, alertService } from '@/_services';

function ResetPassword() {
  const navigate = useNavigate();
  const pathname = useLocation();
  document.title = "Eigopost - Reset Password"
  const TokenStatus = {
    Validating: 'Validating',
    Valid: 'Valid',
    Invalid: 'Invalid'
  }
  const [token, setToken] = useState(null);
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

  useEffect(() => {
    const { token } = queryString.parse(location.search);
    console.log("TOKEN IS " + token);
    // remove token from url to prevent http referer leakage
    navigate(location.pathname);
    accountService.validateResetToken(token)
      .then(() => {
        setToken(token);
        setTokenStatus(TokenStatus.Valid);
      })
      .catch(() => {
        setTokenStatus(TokenStatus.Invalid);
      });
  }, []);

  function getForm() {
    const initialValues = {
      password: '',
      confirmPassword: ''
    };
    const validationSchema = Yup.object().shape({
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    });

    function onSubmit({ password, confirmPassword }, { setSubmitting }) {
      alertService.clear();
      accountService.resetPassword({ token, password, confirmPassword })
      .then(() => {
        alertService.success('Password reset successful, you can now login', { keepAfterRouteChange: true });
        navigate('/account/login');
      })
      .catch(error => {
        setSubmitting(false);
        alertService.error(error);
      });
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
          <div className="reset-password">
          <h3 className="accounts-form-title">Reset Password</h3>
          <div className="card-body">
              <div className="form-group">
                <label>Password</label>
                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                    {isSubmitting && <span className="ep-spinner ep-spinner-sm mr-1"></span>}
                    Reset Password
                  </button>
                  <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
              </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    );
    }

  function getBody() {
    switch (tokenStatus) {
      case TokenStatus.Valid:
        return getForm();
      case TokenStatus.Invalid:
        return <div className="reset-password">
                 <h3 className="card-reader">Oh, that didn't work</h3>
                 <p>
                  Token validation failed, if the token has expired you can get
                  a new one at the
                  <Link to="/account/forgot-password"
                        className=""> forgot password </Link>
                  page.
                 </p>
               </div>;
      case TokenStatus.Validating:
        return <div className="">
                 Validating token...
               </div>;
    }
  }
  return (
    <div>
      <div className="card-body">{getBody()}</div>
    </div>
  )
}
export {ResetPassword};
