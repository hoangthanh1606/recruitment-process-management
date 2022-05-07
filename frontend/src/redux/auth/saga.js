import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';
import { login } from './axios';

import { getToken, clearToken } from '@iso/lib/helpers/utility';
import actions from './actions';

const history = createBrowserHistory();

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function*({ payload }) {
    const { loginData, token } = payload;
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: token,
        profile: 'Profile',
      });
    } else {
      try {
        let loginResult = yield call(login, loginData);
        const { tokens } = loginResult?.data;
        yield put({
          type: actions.LOGIN_SUCCESS,
          token: tokens
        });
      } catch (error) {
        yield put({ type: actions.LOGIN_ERROR });
      }
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*(payload) {
    yield localStorage.setItem('tokens', payload.token);
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    yield clearToken();
    history.push('/');
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function*() {
    const token = getToken().get('idToken');
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        profile: 'Profile',
      });
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
