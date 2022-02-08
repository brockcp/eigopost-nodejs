import React from 'react';
import './home.css';

const About = () => {
  document.title = 'EigoPost | About';

  return(
    <div className="container about fade-in">
      <div className="row">
        <div className="col-sm-12 col-lg-8">
          <h1>
             The Five W
             <small className="s">s</small>
          </h1>
          <ul>
            <h4> Who</h4>
            <p>EigoPost was started by an American
             who spent 10 years living in Tokyo teaching English to
             a wide range of Japanese - from children, to students,
             to business professionals,
             and seniors.
            </p>
            <p>
              <span className='lang-ja' lang="ja">EigoPostは、東京に10年間住んでいて、子供から学生、</span>
              <span className='lang-ja' lang="ja">ビジネス</span>
              <span className='lang-ja' lang="ja">ロフェッショナル、</span>
              <span className='lang-ja' lang="ja">シニアまで、幅広い日本人</span>
              <span className='lang-ja' lang="ja">に英語を教えていた</span>
              <span className='lang-ja' lang="ja">アメリカ人に</span>
              <span className='lang-ja' lang="ja">よって始められました。</span>
            </p>
          </ul>
          <ul>
            <h4>What</h4>
            <p>Eigopost is a site for Japanese to study, learn and practice
             English in a customized way. Rather than learning a list of words
             that may never be used, create your own list and find out how to
             correctly and naturally use them.
            </p>
            <p>
              <span className='lang-ja' lang='ja'>Eigopostは日本人が勉強し、</span>
              <span className='lang-ja' lang='ja'>学び、練習するための</span>
              <span className='lang-ja' lang='ja'>サイトです</span>
              <span className='lang-ja' lang='ja'>カスタマイズされた方法で英語。</span>
              <span className='lang-ja' lang='ja'>決して使用されない</span>
              <span className='lang-ja' lang='ja'>可能性のある単語のリスト</span>
              <span className='lang-ja' lang='ja'>を学習するのではなく、</span>
              <span className='lang-ja' lang='ja'>独自のリストを作成して、</span>
              <span className='lang-ja' lang='ja'>それらを正しく自然に使用</span>
              <span className='lang-ja' lang='ja'>する方法を見つけてください。</span>
            </p>
          </ul>
          <ul>
            <h4>When</h4>
            <p>EigoPost was launched in early 2021, although the idea
                for the site goes back many many years.
            </p>
            <p>
             <span className='lang-ja' lang='ja'>EigoPostは2021</span>
             <span className='lang-ja' lang='ja'>年初頭に発売されましたが、</span>
             <span className='lang-ja' lang='ja'>アイデアは</span>
             <span className='lang-ja' lang='ja'>サイトは何年も前にさかのぼります。</span>
           </p>
          </ul>
          <ul>
            <h4>Where</h4>
            <p>EigoPost was created and launched in Orange County, California.
                However, EigoPost is accessible wherever Japanese want to study,
                learn and practice English.
            </p>
            <p>
              <span className='lang-ja' lang='ja'>EigoPostは、カリフォルニア</span>
              <span className='lang-ja' lang='ja'>州オレンジカウンティで</span>
              <span className='lang-ja' lang='ja'>作成および発売されました。</span>
              <span className='lang-ja' lang='ja'>ただし、EigoPostは、</span>
              <span className='lang-ja' lang='ja'>日本人が英語を勉強し、学び、</span>
              <span className='lang-ja' lang='ja'>練習したい場所ならどこからでも</span>
              <span className='lang-ja' lang='ja'>アクセスできます。</span>
            </p>
          </ul>
          <ul>
            <h4>Why</h4>
            <p>All Japanese school students spend several years studying
                English vocabulary and grammar. However, many of them never
                have a chance to actually use or practice what they have learned.
                That information is then often lost over time.
                With EigoPost students can study the specific English that
                is relative to their lives and practice using it at Eigopost.
                </p>
            <p>
              <span className='lang-ja' lang='ja'>日本の学校の生徒は全員、</span>
              <span className='lang-ja' lang='ja'>英語の語彙と文法</span>
              <span className='lang-ja' lang='ja'>を数年間勉強しています。</span>
              <span className='lang-ja' lang='ja'>しかし、彼らの多くは、</span>
              <span className='lang-ja' lang='ja'>学んだことを実際に使用</span>
              <span className='lang-ja' lang='ja'>したり実践したり</span>
              <span className='lang-ja' lang='ja'>する機会がありません。</span>
              <span className='lang-ja' lang='ja'>その情報は、時間の</span>
              <span className='lang-ja' lang='ja'>経過とともに失われる</span>
              <span className='lang-ja' lang='ja'>ことがよくあります。</span>
              <span className='lang-ja' lang='ja'> EigoPostを使用すると、</span>
              <span className='lang-ja' lang='ja'>学生は自分の生活に</span>
              <span className='lang-ja' lang='ja'>関連する特定の</span>
              <span className='lang-ja' lang='ja'>英語を学び、Eigopostで</span>
              <span className='lang-ja' lang='ja'>それを使用して</span>
              <span className='lang-ja' lang='ja'>練習することができます。</span>
            </p>
          </ul>
        </div>
      </div>
    </div>
  )
}
export {About};
