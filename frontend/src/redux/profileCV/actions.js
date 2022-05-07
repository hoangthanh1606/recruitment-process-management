export function getProfileCV(id) {
  return {
    type: "GET_PROFILE_CV",
    payload: { 
      id,
    }
  }
}

export function changeStatusProfileCV(id, status) {
  return {
    type: "CHANGE_STATUS_PROFILE_CV",
    payload: { 
      id,
      status,
    }
  }
}
