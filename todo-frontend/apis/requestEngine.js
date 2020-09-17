import axios  from 'axios';
import getURL from "./apis";
const CancelToken = axios.CancelToken;

export const superRequest = (requestConfig, cb)=>{
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

export const request = (type='get', urlName, payload={}, auth=false, extraConfig)=>{

  if(typeof payload === "boolean"){
    auth = payload;
  }

  const authToken = auth ?localStorage.getItem('chit'): null;
  let headers = {};
  if(authToken){
    headers['Authorization'] = authToken;
  }

  if(extraConfig && extraConfig.headers){
    Object.keys(extraConfig.headers).map(config=>{
      headers[config] = extraConfig[config];
    });
  }

  let params = [];
  if(urlName.constructor === Array){
    params = urlName;
    urlName = params[0];
    params = params.splice(1, params.length);
  }

  return axios({
    method: type,
    url: getURL(urlName, params),
    data: payload,
    headers: headers
  });
};

export default request;
