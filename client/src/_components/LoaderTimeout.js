import React,{useState, useEffect} from 'react';

const LoaderTimeout = () => {
  const [show, setShow] = useState(true);
  useEffect(
    ()=>{
      let timer1 = setTimeout(() => {
        setShow(false);
      },3000);
      return () => {
      clearTimeout(timer1);
    };
    },
  []);

  if(show) return(
    <div className="loader-container">
      <div className="loader loader-fadeIn"/>
    </div>
  )
  return null;
}
export {LoaderTimeout};
