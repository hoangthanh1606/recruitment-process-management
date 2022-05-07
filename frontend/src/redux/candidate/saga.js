import { put, takeEvery } from "redux-saga/effects";
import sendApi from '@iso/lib/helpers/sendApi';
import service from '../campaign/service';

function* getCampaign(action) {
  try {
    const path = `/api/v1/campaign/details/${action.payload.id}`;
    const result = yield sendApi.get(path);
    if (result.status === 200) {
      yield put({
        type: "CANDIDATE_GET_CAMPAIGN_SUCCESS",
        payload: {
          data: result.data.campaign,
        },
      });
    }
  } catch (e) {
    yield put({
      type: "CANDIDATE_GET_CAMPAIGN_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* getCandidateListCampaign(action) {
  try {
    const params = service.getParams(action);
    const path = '/api/v1/campaign/active';

    const result = yield sendApi.get(path, params);
    if (result.status === 200) {
      yield put({
        type: "CANDIDATE_GET_LIST_SUCCESS",
        payload: {
          data: result.data.campaign,
        },
      });
    }
  } catch (err) {
    yield put({
      type: "CANDIDATE_GET_LIST_FAIL",
      payload: {
        error: err.error,
      },
    });
  }
}

function* candidateApplyCampaign(action) {
  try {
    const data = action.payload.data;
    const path = '/api/v1/profile/';

    const result = yield sendApi.post(path, data);
    if (result.status === 201) {
      yield put({
        type: "CANDIDATE_APPLY_CAMPAIGN_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    }
  } catch (err) {
    yield put({
      type: "CANDIDATE_APPLY_CAMPAIGN_FAIL",
      payload: {
        error: err.error,
      },
    });
  }
}

export default function* candidateSaga() {
  yield takeEvery("CANDIDATE_GET_CAMPAIGN", getCampaign);
  yield takeEvery("CANDIDATE_GET_LIST_CAMPAIGN", getCandidateListCampaign);
  yield takeEvery("CANDIDATE_APPLY_CAMPAIGN", candidateApplyCampaign);
}