import React from 'react';

const About = () => {
  document.title = 'EigoPost | About';

  return(
    <div className="container about fade-in pt-4 pb-4">
      <div className="row">
        <div className="col-sm-12 col-lg-8">
          <h1>
             The Five W
              <small className="s">s</small>
          </h1>
          <ul className="ps-0">
            <h4 className=""> Who</h4>
            <p className="">EigoPost was started by an American
             who spent 10 years living in Tokyo teaching English to
             a wide range of Japanese - from children, to students,
             to business professionals,
             and seniors. </p>
          </ul>
          <ul className="ps-0">
            <h4 className="">What</h4>
            <p className="">Eigopost is a site for Japanese to study, learn and practice
             English in a customized way. Rather than learning a list of words
             that may never be used, create your own list and find out how to
             correctly and naturally use them.</p>
          </ul>
          <ul className="ps-0">
            <h4 className="">When</h4>
            <p className="">EigoPost was launched in early 2021, although the idea
                for the site goes back many many years.</p>
          </ul>
          <ul className="ps-0">
            <h4 className="">Where</h4>
            <p className="">EigoPost was created and launched in Orange County, California.
                However, EigoPost is accessible wherever Japanese want to study,
                learn and practice English.</p>
          </ul>
          <ul className="ps-0">
            <h4 className="">Why</h4>
            <p className="">All Japanese school students spend several years studying
                English vocabulary and grammar. However, many of them never
                have a chance to actually use or practice what they have learned.
                That information is then often lost over time.
                With EigoPost students can study the specific English that
                is relative to their lives and practice using it at Eigopost.</p>
          </ul>
        </div>
      </div>
    </div>
  )
}
export {About};
