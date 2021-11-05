import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {accountService, alertService} from '@/_services';
import {ModalDelete} from '../_components/ModalDelete';

const Update = ({history}) => {
    document.title = "Eigopost | Update Profile";
    const user = accountService.userValue;
    const initialValues = {
        userName: user.userName,
        email: user.email,
        password: '',
        confirmPassword: ''
    };
    const validationSchema = Yup.object().shape({
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
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        accountService.update(user.id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    const [isDeleting, setIsDeleting] = useState(false);
    function onDelete() {
        setIsDeleting(true);
        accountService.delete(user.id)
          .then(() => {
            alertService.success('Account deleted successfully')
            history.push('/');
          });
    }
    const [modalVisible, setModalVisible] = useState(false);
    function deleteModal(){
      setModalVisible(true);
    };
    return (
      <div>
      <ModalDelete modalVis={modalVisible}
                   setModalVisOff={setModalVisible}
                   deleteAccount={onDelete}/>
      {user ? (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="accounts-form">
                  <h3 className="account-form-title">Update Profile</h3>
                  <div className="card-body">
                    <div className="form-row">
                        <div className="mb-3 col-5">
                            <label>Username</label>
                            <Field name="userName" type="text" className={'form-control' + (errors.userName && touched.userName ? ' is-invalid' : '')} />
                            <ErrorMessage name="userName" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <h3 className="pt-3">Change Password</h3>
                    <p>Leave blank to keep the same password</p>
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
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Update
                        </button>
                    </div>
                    <hr />
                    <h3 className="pt-3">Delete Account</h3>
                    <div className="mb-3">
                        <button type="button" onClick={() => deleteModal()} className="btn btn-primary" style={{ width: '75px' }} disabled={isDeleting}>
                            {isDeleting
                                ? <span className="spinner-border spinner-border-sm"></span>
                                : <span>Delete</span>
                            }
                        </button>
                        <Link to="." className="account-link ps-3">Cancel</Link>
                    </div>
                  </div>
                </div>
              </Form>
            )}
        </Formik>
      ):(
        <h3>You have to join first to edit your profile</h3>
      )
    }
    </div>
    )
}
export {Update};
