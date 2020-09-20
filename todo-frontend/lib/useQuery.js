import { useState, useEffect } from 'react';
import request from '../apis/requestEngine';

const useQuery = (initialConfig) => {
  const [data, setData] = useState({ hits: [] });
  const [config, setConfig] = useState(initialConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await request(config);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [config]);

  return [{ data, isLoading, isError }, setConfig];
};

export default useQuery;
