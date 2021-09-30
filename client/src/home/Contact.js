import React from 'react';

const Contact = () => {
  document.title = "Eigopost | Contact"
  return(
    <div className="container p-4">
      <h3>Contact</h3>
      <p>We would love to hear from you. You can email
         us below
      </p>
      <a href="mailto:info@eigopost.com"
         className="btn btn-primary"
         target="_blank"
         rel="noopener noreferrer">
       email
     </a>
    </div>
  )
}
export {Contact};
