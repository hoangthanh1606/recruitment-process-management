import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import sendApi from '@iso/lib/helpers/sendApi';
import service from './service';

function* addCampaignSaga(action) {
  try {
    const token = localStorage.getItem('tokens');
    let { name, image, rangePicker, positions, technologies, quantity, description } = action.payload;
    image = image.toString();
    positions = positions.toString();
    technologies = technologies.toString();
    const result = yield axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/campaign`,
      data: {
        name,
        image,
        positions,
        technologies,
        startDate: rangePicker[0],
        endDate: rangePicker[1],
        quantity,
        description,
      },
      headers: {
        'Authorization': `Basic ${token}` 
      }
    });
    if (token) {
      yield put({
        type: "ADD_CAMPAIGN_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    }
  } catch (e) {
    yield put({
      type: "ADD_CAMPAIGN_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* getlistCampaignSaga(action) {
  try {
    const params = service.getParams(action);
    const path = '/api/v1/campaign';

    const result = yield sendApi.get(path, params);
    if (result.status === 200) {
      yield put({
        type: "GET_LIST_SUCCESS",
        payload: {
          data: result.data.campaign,
        },
      });
    }
  } catch (err) {
    yield put({
      type: "GET_LIST_FAIL",
      payload: {
        error: err.error,
      },
    });
  }
}

function* getListProfilebyCampaignSaga(action) {
  try {
    const path = `/api/v1/campaign/${action.payload.id}/profile`;
    const query = action.payload.query;
    const result = yield sendApi.get(path, query);
    if (result.status === 200) {
      yield put({
        type: "GET_LIST_PROFILE_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    }
  } catch (err) {
    yield put({
      type: "GET_LIST_PROFILE_FAIL",
      payload: {
        error: err.error,
      },
    });
  }
} 

function* updateCampaignSaga(action) {
  try {
    const token = localStorage.getItem('tokens');
    let { name, image, rangePicker, positions, technologies, quantity, description, id, isActive} = action.payload;
    image = image.toString();
    positions = positions.toString();
    technologies = technologies.toString();
    const result = yield axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/campaign/${id}`,
      data: {
        name,
        image,
        positions,
        technologies,
        startDate: rangePicker[0],
        endDate: rangePicker[1],
        quantity,
        description,
        isActive
      },
      headers: {
        'Authorization': `Basic ${token}` 
      }
    });
      yield put({
        type: "UPDATE_CAMPAIGN_SUCCESS",
        payload: {
          data: result.data,
          id: id
        },
      })
  } catch (e) {
    yield put({
      type: "UPDATE_CAMPAIGN_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* getCampaignDetailSaga(action) {
  try {
    const token = localStorage.getItem('tokens');
    const { id, isActive } = action.payload;
    const result = yield axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/campaign/details/${id}`,
      params: {
        isActive
      }
    });
    yield put({
      type: "GET_CAMPAIGN_DETAIL_SUCCESS",
      payload: {
        data: result.data,
      },
      headers: {
        'Authorization': `Basic ${token}` 
      }
    });
  } catch (e) {
    yield put({ type: "GET_CAMPAIGN_DETAIL_FAIL", error: e.error });
  }
}

export default function* campaignSaga() {
  yield takeEvery("ADD_CAMPAIGN_REQUEST", addCampaignSaga);
  yield takeEvery("GET_LIST_CAMPAIGN_REQUEST", getlistCampaignSaga);
  yield takeEvery("GET_LIST_PROFILE_BY_CAMPAIGN_REQUEST", getListProfilebyCampaignSaga);
  yield takeEvery("UPDATE_CAMPAIGN_LIST_REQUEST", updateCampaignSaga);
  yield takeEvery("GET_CAMPAIGN_DETAIL_REQUEST", getCampaignDetailSaga);
}