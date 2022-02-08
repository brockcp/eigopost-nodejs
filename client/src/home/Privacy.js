import React from 'react';
import './home.css';

const Privacy = () => {
  document.title = "Eigopost | Privacy Policy"
  return(
    <div className="container privacy fade-in">
      <div className="row">
        <div className="col-sm-12 col-lg-8">
           <h1>Privacy Policy</h1>
           <ul className="">
             <h4 className="">User Data</h4>
             <p className="">Eigopost collects the following user information: email address, username, password and user activity on Eigopost. This information is used to enable users to access Eigopost and to identfy users and their activity only within the Eigopost community. Only your username and activity in the form of posts, comments and votes are visible publicly.
             </p>
             <p className='lang-ja' lang="ja">
             Eigopostは、Eigopostでの電子メールアドレス、ユーザー名、パスワード、およびユーザーアクティビティのユーザー情報を収集します。 この情報は、ユーザーがEigopostにアクセスできるようにし、Eigopostコミュニティ内でのみユーザーとそのアクティビティを識別するために使用されます。 投稿、コメント、投票の形式でのユーザー名とアクティビティのみが公開されます。
             </p>
             <p className="">Eigopost will never sell or provide your data to any third party. And Eigopost will never track any user activity outside Eigopost.
             </p>
             <p className='lang-ja' lang="ja">
             Eigopostがお客様のデータを第三者に販売または提供することは決してありません。 また、EigopostはEigopost以外のユーザーアクティビティを追跡することはありません。
             </p>
           </ul>
        </div>
      </div>
    </div>
  )
}
export {Privacy};
