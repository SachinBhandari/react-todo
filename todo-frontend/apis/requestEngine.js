import axios  from 'axios';
import getURL from "./apis";
const CancelToken = axios.CancelToken;

export const request = (requestConfig, cb)=>{
  let config = {...requestConfig, timeout: 1200000};

  const authToken = config.auth ?localStorage.getItem('chit'): null;

  if(authToken){
    if(config.headers){
      config.headers['Authorization'] = authToken;
    }else{
      config.headers = {
        'Authorization': authToken
      };
    }
    delete config['auth'];
  }

  if(config.inUrlParams){
    config.url = getURL(config.url, config.inUrlParams);
    delete config['inUrlParams'];
  }else{
    config.url = getURL(config.url);
  }

  if(typeof cb === "function"){
    config.cancelToken = new CancelToken(cb)
  }

  return axios(config);
};

export default request;
