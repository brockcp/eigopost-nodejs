import React, {useState, useEffect} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import {accountService} from '@/_services';
import {Nav, Footer} from '@/layout';
import {keepTheme, Alerts, NotFound, Unauthorized} from '@/_components';
import {Role, RouteAdmin, RouteUser} from '@/_helpers';
import {Landing, About, Contact, Terms, Privacy} from '@/home';
import {Profile} from '@/profile';
import {Admin} from '@/admin';
import {Account} from '@/account';
import Posts from '../posts/Posts';
import Post from '../posts/Post';
import PostForm from '../posts/PostForm';

const App = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const subscription = accountService.user.subscribe(x => setUser(x));
    return subscription.unsubscribe;
  }, []);
  useEffect(() => {
    keepTheme();
  })
  return (
    <div className="container-fluid container-main px-0">
      <Nav />
      <Alerts />
      <div className="global-mh">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms-of-use" element={<Terms />} />
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="profile/*" element={<Profile />} />
          <Route path="admin/*" element={
             <RouteAdmin roles={[Role.Admin]}>
               <Admin />
             </RouteAdmin>
          }/>
          <Route path="account/*" element={<Account />} />
          <Route path="new-post" element={ <PostForm />}/>
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:slug" element={<Post />} />
          <Route path="not-found" element={<NotFound />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}
export default App;
