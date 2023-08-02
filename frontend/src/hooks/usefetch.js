import { useState, useEffect } from 'react';

export const usefetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3060/${url}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, [url]);

  return data;
};
