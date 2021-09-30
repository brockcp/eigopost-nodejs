import React, {useState, useEffect} from 'react';
import {accountService} from '@/_services';
import {Link, Route, Switch, Redirect, useLocation} from 'react-router-dom';
import {Nav, Alert, NotFound, Footer, PrivateRoute} from '@/_components';
import {Role} from '@/_helpers';
import {Landing, About, Contact, Terms} from '@/home';
import {Profile} from '@/profile';
import {Admin} from '@/admin';
import {Account} from '@/account';
import Posts from '../posts/Posts';
import Post from '../posts/Post';
import FormPost from '../posts/FormPost';

const App = () => {
  const { pathname } = useLocation();
  const [user, setUser] = useState({});
  useEffect(() => {
      const subscription = accountService.user.subscribe(x => setUser(x));
      return subscription.unsubscribe;
  }, []);

  return (
    <div className="container-fluid pl-0 pr-0">
      <Nav />
      <Alert />
      <div className="global-mh">
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          <Route exact path="/" component={Landing} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/terms" component={Terms} />
          <PrivateRoute path="/profile" roles={[Role.User]} component={Profile} />
          <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
          <Route path="/account" component={Account} />
          <Route path="/new-post" component={FormPost} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:slug" component={Post} />
          <Route path="/not-found" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer/>
    </div>
  );
}
export default App;
