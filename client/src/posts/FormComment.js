import React,{useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {accountService, alertService, postsComments} from '@/_services';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {ModalSend} from '../_components/ModalSend';

const FormComment = (props) => {
  const user = accountService.userValue;
  const history = useHistory();
  const message = "Are you sure you want to post this comment?";
  const [modalVisible, setModalVisible] = useState(false);
  const [postId, setPostId] = useState(props.postId);
  useEffect(() => {
    setPostId(postId);
  }, [props.postId]);

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    commentModal();
    setSubmitting(false);
  }
  function commentModal(){
    setModalVisible(true);
  };
  function commentSend(fields){
    postsComments.commentRegister(fields, postId)
      .then(() => {
        alertService.success('Your comment has been posted', { keepAfterRouteChange: true });
        history.replace({pathname: "/posts"});
      })
      .catch(error => {
        alertService.error('Oops! Comment not received' + error);
      });
  }
  return (
    <div className="comment-form fade-in">
      {user ? (
          <Formik
            initialValues={{
              comment_body: '',
              userName:user.userName,
              userId:user.id,
              postId:postId
            }}
            validationSchema={Yup.object().shape({
              comment_body: Yup.string()
                .required('comment required')
            })}
            onSubmit={onSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                  <div className="form-row">
                    <label>Comment</label>
                    <Field name="comment_body"
                           component="textarea"
                           rows="5"
                           className={'form-control' +
                           (errors.comment_body && touched.comment_body ? ' is-invalid' : '')} />
                    <ErrorMessage name="comment_body"
                                  component="div"
                                  className="invalid-feedback"
                    />
                  </div>
                  <div className="form-row">
                    <button type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary">
                      {isSubmitting &&
                        <span className="spinner-border spinner-border-sm mr-1">
                        </span>
                      }
                      Submit Comment
                    </button>
                  </div>
                  <ModalSend modalVis={modalVisible}
                             setModalVisOff={setModalVisible}
                             send={commentSend}
                             statement={message}
                  />
              </Form>
            )}
          </Formik>
      ):(
        <div className="guest-container fade-in">
          <h5 className="guest-message">
            Would you like to comment? Please sign in or sign up.
          </h5>
          <Link to={'/account/login'}
                className="btn btn-primary">
            Sign in
          </Link>
          <Link to={'/account/register'}
                className="btn btn-primary">
            Sign up
          </Link>
        </div>
      )}
    </div>
  )
}
export default FormComment;
