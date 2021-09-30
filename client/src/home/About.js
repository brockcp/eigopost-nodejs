import React from 'react';

const About = () => {
  document.title = 'EigoPost | About';

  return(
    <>
    <div className="container pt-4">
      <div className="row d-flex justify-content-center">
        <div className="col-md-8">
          <h1 className="color-1">
             The Five W
              <small className="color-3d">s</small>
          </h1>
          <ul className="color-3">
            <h4> Who</h4>
            <li>EigoPost was started by an American
             who spent 10 years living in Tokyo teaching English to
             a wide range of Japanese - from children, to students,
             to business professionals,
             and seniors. </li>
          </ul>
          <ul className="color-3">
            <h4>What</h4>
            <li>Eigopost is a site for Japanese to study, learn and practice
             English in a customized way. Rather than learning a list of words
             that may never be used, create your own list and find out how to
             correctly and naturally use them.</li>
          </ul>
          <ul className="color-3">
            <h4>When</h4>
            <li>EigoPost was launched in early 2021, although the idea
                for the site goes back many many years.</li>
          </ul>
          <ul className="color-3">
            <h4>Where</h4>
            <li>EigoPost was created and launched in Orange County, California.
                However, EigoPost is accessible wherever Japanese want to study,
                learn and practice English.</li>
          </ul>
          <ul className="color-3">
            <h4>Why</h4>
            <li>All Japanese school students spend several years studying
                English vocabulary and grammar. However, many of them never
                have a chance to actually use or practice what they have learned.
                That information is then often lost over time.
                With EigoPost students can study the specific English that
                is relative to their lives and practice using it at Eigopost. </li>
          </ul>
        </div>
      </div>
    </div>
  </>
  )
}
export {About};
