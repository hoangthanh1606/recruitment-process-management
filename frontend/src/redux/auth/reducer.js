import actions from './actions';

const initState = { idToken: null, isSuccess: true, isLoading: false};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        isSuccess: true,
        isLoading: true
      };
    case actions.LOGIN_SUCCESS:
      return {
        idToken: action.token,
        isSuccess: true
      };
    case actions.LOGIN_ERROR:
      return {
        isSuccess: false,
        isLoading: false
      };
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
