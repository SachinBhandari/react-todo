const BASE_URL = process.env.BASE_URL;
console.log(BASE_URL);

const getURL = (key, params=[])=> {
  const apiBank = {
    TODO: `/todo/${params[0] || ''}`,
  };

  try {
    if (key && typeof apiBank[key] != 'undefined') {
      return new URL(`api${apiBank[key]}`, BASE_URL);
    } else {
      throw new Error('Url is absent from url bank.');
    }
  } catch (err) {
    // console.log(err);
  }
};

export default getURL;
