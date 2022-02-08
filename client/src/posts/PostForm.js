import React,{useState, useEffect} from 'react';
import {Link, useNavigate, Navigate} from 'react-router-dom';
import {accountService, alertService, postsComments} from '@/_services';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {ModalSend, Loader} from '@/_components';
import AuthCheck from '../_helpers/AuthCheck';
import './PostForm.css';

const PostForm = () => {
  document.title = "EigoPost - New Post"
  const user = accountService.userValue;
  let navigate = useNavigate();
  const message = "Are you sure you want to post this?";
  const [modalVisible, setModalVisible] = useState(false);

  function onSubmit(fields, {setStatus, setSubmitting}) {
    setStatus();
    setSubmitting(false);
    postModal();
  }
  function postModal(){
    setModalVisible(true);
  };
  function postSend(fields, setSubmitting){
    setSubmitting(true);
    postsComments.postRegister(fields)
      .then(() => {
        alertService.success('Your post has been posted', { keepAfterRouteChange: true });
        navigate('/posts');
      })
      .catch(error => {
        setSubmitting(false);
        alertService.error('Oops! Post not sent' + error);
      });
  }
  return (
     <div className="container-fluid post-form">
        <div className="row">
          {!user &&  <AuthCheck/>}
          {user && (
            <div className="new-post-form">
              <Formik
                initialValues={{
                  post_title:'',
                  post_body:'',
                  category:'',
                  userName:user.id,
                }}
                validationSchema={Yup.object().shape({
                  post_title: Yup.string()
                  .required('Title Please'),
                  post_body: Yup.string()
                  .required('Body Please'),
                  category: Yup.string()
                  .required('Category Please'),
                  })}
                onSubmit={onSubmit}
              >
                {({ errors,
                    touched,
                    isSubmitting,
                    setSubmitting,
                    values
                  }) => (
                    <Form>
                       <h3 className="">New Post</h3>
                       <div className="card-body">
                         <div className="form-row">
                              <div className="col-12">
                                <label>Category</label>
                                <Field name="category"
                                       as="select"
                                       className={'form-control post-form-select' +
                                        (errors.category && touched.category ? ' is-invalid' : '')}>
                                  <option value=""></option>
                                  <option value="grammar">grammar</option>
                                  <option value="expression">expressions</option>
                                  <option value="random">random</option>
                                </Field>
                                <ErrorMessage name="category" component="div" className="invalid-feedback" />
                              </div>
                          </div>
                          <div className="form-row">
                            <div className="col-12">
                              <label>Title</label>
                              <Field name="post_title" type="text" className={'form-control' + (errors.post_title && touched.post_title ? ' is-invalid' : '')} />
                              <ErrorMessage name="post_title" component="div" className="invalid-feedback" />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-12">
                              <label>Post</label>
                              <Field name="post_body" type="text" component="textarea" rows="8" className={'form-control' + (errors.post_body && touched.post_body ? ' is-invalid' : '')} />
                              <ErrorMessage name="post_body" component="div" className="invalid-feedback" />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-12">
                              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Submit Post
                              </button>
                              <Link to="/posts" className="btn btn-link">Cancel</Link>
                            </div>
                          </div>
                       </div>
                       <ModalSend modalVis={modalVisible}
                                   setModalVisOff={setModalVisible}
                                   send={postSend}
                                   statement={message}
                                   isSubmitting={isSubmitting}
                                   setSubmitting={setSubmitting}
                                   values={values}
                       />
                    </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
     </div>
  )
}
export default PostForm;
