import React,{useState, useEffect} from 'react';
import axios from 'axios';

const hookFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  async function getData() {
    try {
      setLoading(true);
      const data = await axios(url);
      setData(data.data);
    }
    catch(e){
      setError(e);
    }
    finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    setTimeout(async () => {
      getData();
    },1000)
  },[]);
  return {data, error, loading};
}
export {hookFetch};
