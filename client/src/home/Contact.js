import React from 'react';

const Contact = () => {
  document.title = "Eigopost | Contact"

  return(
    <div className="container contact fade-in">
      <div className="row">
        <div className="col-sm-12 col-lg-8">
           <h1>Contact</h1>
           <p>We would love to hear from you. You can email
              us below
           </p>
           <div className="">
             <a href="mailto:info@eigopost.com"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer">
              email
             </a>
           </div>
        </div>
      </div>
    </div>
  )
}
export {Contact};
