import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {accountService, alertService} from '@/_services';
import {ModalDelete} from '../_components/ModalDelete';
import {Loader} from '../_components/Loader';
import './Update.css';

const Update = ({history}) => {
  document.title = "Eigopost | Update Profile";
  const user = accountService.userValue;
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    accountService.update(user.id, fields)
      .then(() => {
        alertService.success('Update successful',
          { keepAfterRouteChange: true });
        navigate('/profile');
      })
      .catch(error => {
        setSubmitting(false);
        alertService.error(error);
      });
  }
  function onDelete() {
    setIsDeleting(true);
    accountService.delete(user.id)
      .then(() => {
        alertService.success('Account deleted successfully')
        navigate('/profile');
      });
  }
  function deleteModal(){
    setModalVisible(true);
  };
  return (
    <div>
    {user && (
      <Formik initialValues={{
                userName: user.userName,
                email: user.email,
                password: '',
                confirmPassword: '',
              }}
              validationSchema={Yup.object().shape({
                userName: Yup.string()
                  .required('Username is required'),
                email: Yup.string()
                  .email('Email is invalid')
                  .required('Email is required'),
                password: Yup.string()
                  .min(6, 'Password must be at least 6 characters'),
                confirmPassword: Yup.string()
                  .when('password', (password, schema) => {
                    if (password) return schema.required('Confirm Password is required');
                  })
                  .oneOf([Yup.ref('password')], 'Passwords must match')
              })}
              onSubmit={onSubmit}>
          {({ errors,
              touched,
              isSubmitting,
              setSubmitting,
              values
           }) => (
            <Form>
              <div className="update-form">
                <h3 className="update-form-title">Update Profile</h3>
                <div className="card-body">
                  <div className="form-row">
                    <div className=" form-group col-6">
                      <label>Username</label>
                      <Field name="userName" type="text" className={'form-control' + (errors.userName && touched.userName ? ' is-invalid' : '')} />
                      <ErrorMessage name="userName" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <label>Password</label>
                      <span className="password-message">(leave brank if not changing)</span>
                      <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                      <ErrorMessage name="password" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group col">
                      <label>Confirm Password</label>
                      <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                      <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary mr-2">
                      {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                      Update
                    </button>
                  </div>
                  <hr />
                  <h4>Delete Account</h4>
                  <div className="form-group">
                    <button type="button"
                            className="btn btn-primary"
                            style={{ width: '4.688rem' }}
                            disabled={isDeleting}
                            onClick={() => deleteModal()}
                    >
                        {isDeleting
                            ? <span className="spinner-border spinner-border-sm"></span>
                            : <span>Delete</span>
                        }
                    </button>
                    <Link to="/profile"
                          className="update-link"
                    >
                     Cancel
                    </Link>
                  </div>
                </div>
              </div>
              <ModalDelete modalVis={modalVisible}
                           setModalVisOff={setModalVisible}
                           deleteAccount={onDelete}
                           isSubmitting={isSubmitting}
              />
            </Form>
          )}
      </Formik>
    )}
    {!user && <Loader/>}
  </div>
  )
}
export {Update};
