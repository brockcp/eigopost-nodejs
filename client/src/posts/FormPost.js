import React,{useState} from 'react';
import {accountService, alertService, postsComments} from '@/_services';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {ModalSend} from '../_components/ModalSend';

const FormPost = ({history}) => {
  document.title = "EigoPost - New Post"
  const user = accountService.userValue;
  const message = "Are you sure you want to post this?";
  function onSubmit(fields, {setStatus, setSubmitting}) {
    setStatus();
    postModal();
    setSubmitting(false);
  }
  const [modalVisible, setModalVisible] = useState(false);
  function postModal(){
    setModalVisible(true);
  };
  function postSend(fields){
    postsComments.postRegister(fields)
      .then(() => {
        alertService.success('Your post has been received', { keepAfterRouteChange: true });
        history.replace('/posts');
      })
      .catch(error => {
        alertService.error('Oops! Post not sent' + error);
      });
  }
  return (
     <div className="container-fluid">
        <div className="row">
          {user ? (
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
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                       <h3 className="">New Post</h3>
                       <div className="card-body">
                       <div className="form-row">
                            <div className="mb-3 col-12">
                              <label>Category</label>
                              <Field name="category" as="select" className={'form-control' + (errors.category && touched.category ? ' is-invalid' : '')}>
                                <option value=""></option>
                                <option value="grammar">grammar</option>
                                <option value="expression">expressions</option>
                                <option value="random">random</option>
                              </Field>
                              <ErrorMessage name="category" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                           <div className="form-row">
                                <div className="mb-3 col-12">
                                  <label>Title</label>
                                  <Field name="post_title" type="text" className={'form-control' + (errors.post_title && touched.post_title ? ' is-invalid' : '')} />
                                  <ErrorMessage name="post_title" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="mb-3 col-12">
                                  <label>Post</label>
                                  <Field name="post_body" type="text" component="textarea" rows="8" className={'form-control' + (errors.post_body && touched.post_body ? ' is-invalid' : '')} />
                                  <ErrorMessage name="post_body" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="mb-3">
                                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                      {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                      Submit Post
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ModalSend modalVis={modalVisible}
                                   setModalVisOff={setModalVisible}
                                   send={postSend}
                                   statement={message}
                        />
                    </Form>
                )}
              </Formik>
            </div>
          ):(
            <div className="col-sm-12 p-4">
              <p className="text-center">
                Please login or sign up to post.
              </p>
            </div>
          )}
        </div>
    </div>
  )
}
export default FormPost;
