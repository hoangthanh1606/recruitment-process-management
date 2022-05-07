const initialState = {
  errorProfile: '',
  profile: {},
}

export default function profileCVReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PROFILE_CV_SUCCESS': {
      return {
        ...state,
        error: '',
        profile: action.payload.data,
      }
    }

    case 'GET_PROFILE_CV_FAIL': {
      return {
        ...state,
        error: action.payload,
      };
    }

    case 'CHANGE_STATUS_PROFILE_CV_SUCCESS': {
      return {
        ...state,
        error: '',
        profile: action.payload.data,
      }
    }

    case 'CHANGE_STATUS_PROFILE_CV_FAIL': {
      return {
        ...state,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
