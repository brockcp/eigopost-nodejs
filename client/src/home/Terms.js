import React from 'react';

const Terms = () => {
  document.title = "Eigopost | Terms of Use"
  return(
    <div className="container terms fade-in">
      <div className="row">
        <div className="col-sm-12 col-lg-8">
           <h1>Terms of use</h1>
           <p>
             By using Eigopost, you agree to the following terms of use:
           </p>
           <ul className="">
             <h4 className="">Site Access</h4>
             <p className="">To participate at Eigopost, users need to register for an account and agree to these terms of use. Users are responsible for ensuring that their account information is complete and kept up to date. Users have the right to cancel their accounts whenever they like, at which time all user data will be deleted.
             </p>
             <p className='lang-ja' lang="ja">
             Eigopostに参加するには、ユーザーはアカウントに登録し、これらの利用規約に同意する必要があります。 ユーザーは、自分のアカウント情報が完全で最新の状態に保たれていることを確認する責任があります。 ユーザーはいつでもアカウントをキャンセルする権利があり、その時点ですべてのユーザーデータが削除されます。
             </p>
           </ul>
           <ul className="">
             <h4 className="">User Conduct</h4>
             <p>
             All Eigopost users are welcome to participate on Eigopost by submitting posts, providing answers to posts, commenting on posts and voting on comments and posts, provided that they agree to be respectful, kind and helpful. If any user is found not being respectful, kind, or helpful, Eigopost reserves the right to refuse, suspend or terminate their access to the site at any time.
             </p>
             <p className='lang-ja' lang="ja">
             すべてのEigopostユーザーは、敬意を持って親切で役立つことに同意することを条件に、投稿の送信、投稿への回答の提供、投稿へのコメント、コメントと投稿への投票によってEigopostに参加できます。 ユーザーが敬意を払う、親切、または役に立たないことが判明した場合、Eigopostはいつでもサイトへのアクセスを拒否、一時停止、または終了する権利を留保します。
             </p>
           </ul>
           <ul className="">
             <h4 className="">Eigopost Content</h4>
             <p className="">All information displayed on Eigopost is the property of Eigopost and is protected by United States and international copyright laws.
             </p>
             <p className='lang-ja' lang="ja">
             Eigopostに表示されるすべての情報は、Eigopostの所有物であり、米国および国際的な著作権法によって保護されています。
             </p>
           </ul>
        </div>
      </div>
    </div>
  )
}
export {Terms};
