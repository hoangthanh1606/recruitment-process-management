import axios from "axios";

const getHeader = async () => {
  const token = await localStorage.getItem('tokens');
  return {
    'Authorization': `Basic ${token}`
  };
}

const base = process.env.REACT_APP_BACKEND_URL;

async function getApi(path, params) {
  return await axios({
    method: 'GET',
    url: `${base}${path}`,
    params: params,
    headers: await getHeader(),
  });
}

async function postApi(path, data) {
  return await axios({
    method: 'POST',
    url: `${base}${path}`,
    data: data,
    headers: await getHeader(),
  });
}

async function patchApi(path, data) {
  return await axios({
    method: 'PATCH',
    url: `${base}${path}`,
    data: data,
    headers: await getHeader(),
  });
}

const sendApi = {
  get: getApi,
  post: postApi,
  patch: patchApi,
};

export default sendApi;