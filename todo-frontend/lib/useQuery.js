import { useState, useEffect } from 'react';
import request from './requestEngine';

const useQuery = (config) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect( () => {
    console.log('mount');
    const fetchData = async () => {
      setError(false);
      setLoading(true);

      try {
        const result = await request(config);
        setData(result.data);
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    };

    fetchData();
    return () => {
      console.log('unmount');
    }
  }, []);

  return { data, loading, error };
};

export default useQuery;
