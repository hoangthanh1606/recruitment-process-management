const getParams = (action) => {
  let positions = '', name = '', status, technologies = '';
  if (action.payload) {
    let payload = action.payload;
    if (payload.position) {
      positions = payload.position.toString();
    }
    if (payload.search) {
      name = payload.search;
    }
    if (payload.status) {
      let statusInput = [];
      if(payload.status[0] === 'Active') {
        statusInput[0] = true;
      } else {
        statusInput[0] = false;
      }
      if (payload.status[1]) {
        if(payload.status[1] === 'Active') {
          statusInput[1] = true;
        } else {
          statusInput[1] = false;
        }
      }
      status = statusInput.toString();
    }
    if (payload.technologies) {
      technologies = payload.technologies.toString();
    }
  }
  
  return {
    positions,
    name,
    status,
    technologies,
  };
}

const service = {
  getParams
};

export default service;