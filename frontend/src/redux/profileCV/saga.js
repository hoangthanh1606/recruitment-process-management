import { put, takeEvery } from "redux-saga/effects";
import sendApi from '@iso/lib/helpers/sendApi';

function* getProfileCV(action) {
  try {
    const path = `/api/v1/profile/details/${action.payload.id}`;
    const result = yield sendApi.get(path);
    if (result.status === 200) {
      yield put({
        type: "GET_PROFILE_CV_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    }
  } catch (e) {
    yield put({
      type: "GET_PROFILE_CV_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* changeStatusProfileCV(action) {
  try {
    const path = `/api/v1/profile/${action.payload.id}`;
    const status ={status: action.payload.status};
    const result = yield sendApi.patch(path,status);
    if (result.status === 200) {
      yield put({
        type: "CHANGE_STATUS_PROFILE_CV_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    }
  } catch (e) {
    yield put({
      type: "CHANGE_STATUS_PROFILE_CV_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

export default function* profileCVSaga() {
  yield takeEvery("GET_PROFILE_CV", getProfileCV);
  yield takeEvery("CHANGE_STATUS_PROFILE_CV", changeStatusProfileCV);
}
