const base_url = '';

const getURL = (key, params=[])=> {

  try{
    const apiBank = {
      CHARGE_BREAKUP: `/todo/${params[0]||''}`,
    };

    if(key && typeof apiBank[key] != 'undefined'){
      return base_url+apiBank[key];
    }else{
      throw new Error('Url is absent from url bank.');
    }
  }catch (err){
    // console.log(err);
  }

};

export default getURL;
