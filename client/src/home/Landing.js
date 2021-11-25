import React from 'react';
import {accountService} from '@/_services';
import logo from '../assets/img-logo-big.png';

const Landing = () => {
  document.title = "エイゴポスト | Welcome";
  const user = accountService.userValue;
  return(
    <div className="container-fluid landing">
        <div className="jumbotron">
          <h1>
            EigoPost
            {!user && <span lang="ja">
              へようこそ!
                      </span>
            }
          </h1>
          <img src={logo}
               className="logo fade-in"
               alt="logo"/>
          <p>
             <span className='lang-ja' lang="ja">エイゴポストは、</span>
             <span className='lang-ja' lang="ja">日本人の</span>
             <span className='lang-ja' lang="ja">みなさんが、</span>
             <span className='lang-ja' lang="ja">英語を学び、</span>
             <span className='lang-ja' lang="ja">実践し、</span>
             <span className='lang-ja' lang="ja">英語スキルを</span>
             <span className='lang-ja' lang="ja">上達</span>
             <span className='lang-ja' lang="ja">させるための</span>
             <span className='lang-ja' lang="ja">サイトです。</span>
          </p>
        </div> {/* end jumbotron */}
        <div className="container-fluid landing-sub">
          <div className="row">
            <div className="col-sm-4">
              <p>
                <span className='lang-ja' lang="ja">英語で言いたい</span>
                <span className='lang-ja' lang="ja">のに、</span>
                <span className='lang-ja' lang="ja">何と言ったらいい</span>
                <span className='lang-ja' lang="ja">のか</span>
                <span className='lang-ja' lang="ja">分からない</span>
                <span className='lang-ja' lang="ja">とき</span>
                <span className='lang-ja' lang="ja">が</span>
                <span className='lang-ja' lang="ja">ありませんか？</span>
              </p>
            </div>
            <hr className="landing-sub-break" />
            <div className="col-sm-4">
              <p>
                <span className='lang-ja' lang="ja">英語を聞いて、</span>
                <span className='lang-ja' lang="ja">理解できない</span>
                <span className='lang-ja' lang="ja">ときは</span>
                <span className='lang-ja' lang="ja">ありませんか？</span>
              </p>
            </div>
            <hr className="landing-sub-break" />
            <div className="col-sm-4">
              <p>
                <span className='lang-ja' lang="ja">英語を上達</span>
                <span className='lang-ja' lang="ja">させたい人の</span>
                <span className='lang-ja' lang="ja">ヘルプをしたく</span>
                <span className='lang-ja' lang="ja">ありませんか？</span>
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}
export {Landing};
