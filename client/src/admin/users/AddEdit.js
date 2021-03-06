import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { accountService, alertService } from '@/_services';

function AddEdit() {
  const navigate = useNavigate();
  let {id} = useParams();
  const isAddMode = !id;
  const initialValues = {
    userName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  };
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required('First Name is required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    role: Yup.string()
      .required('Role is required'),
    password: Yup.string()
      .concat(isAddMode ? Yup.string().required('Password is required') : null)
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .when('password', (password, schema) => {
        if (password) return schema.required('Confirm Password is required');
      })
      .oneOf([Yup.ref('password')], 'Passwords must match')
  });
  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    if (isAddMode) {
      createUser(fields, setSubmitting);
    } else {
      updateUser(id, fields, setSubmitting);
    }
  }
  function createUser(fields, setSubmitting) {
    accountService.create(fields)
    .then(() => {
      alertService.success('User added successfully', { keepAfterRouteChange: true });
      navigate(-1);
    })
    .catch(error => {
      setSubmitting(false);
      alertService.error(error);
    });
  }
  function updateUser(id, fields, setSubmitting) {
    accountService.update(id, fields)
    .then(() => {
      alertService.success('Update successful',
       {keepAfterRouteChange: true});
      navigate(-1);
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
            isSubmitting,
            setFieldValue
         }) => {
          useEffect(() => {
            if (!isAddMode) {
              // get user and set form fields
              accountService.getById(id).then(user => {
                  const fields = ['userName', 'email', 'role'];
                  fields.forEach(field => setFieldValue(field, user[field], false));
              });
            }
          }, []);
          return (
            <div className="add-user-form">
              <Form>
                <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
                <div className="form-row">
                  <div className="mb-3 col-5">
                    <label>Username:</label>
                    <Field name="userName" type="text" className={'form-control' + (errors.userName && touched.userName ? ' is-invalid' : '')} />
                    <ErrorMessage name="userName" component="div" className="invalid-feedback" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="mb-3 col-7">
                    <label>Email</label>
                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>
                  <div className="mb-3 col">
                    <label>Role</label>
                    <Field name="role" as="select" className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')}>
                      <option value=""></option>
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </Field>
                    <ErrorMessage name="role" component="div" className="invalid-feedback" />
                  </div>
                </div>
                {!isAddMode &&
                    <div>
                        <h3 className="pt-3">Change Password</h3>
                        <p>Leave blank to keep the same password</p>
                    </div>
                }
                <div className="form-row">
                    <div className="mb-3 col">
                        <label>Password</label>
                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                    </div>
                    <div className="mb-3 col">
                        <label>Confirm Password</label>
                        <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                    </div>
                </div>
                <div className="mb-3">
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Save
                    </button>
                    <Link to={isAddMode ? '.' : '..'} className="add-user-link">Cancel</Link>
                </div>
              </Form>
            </div>
          );
        }}
    </Formik>
  );
}
export {AddEdit};
