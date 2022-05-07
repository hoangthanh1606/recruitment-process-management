export function addCampaignAction(params) {
  return {
    type: "ADD_CAMPAIGN_REQUEST",
    payload: params
  }
}

export function getListCampaignAction(query) {
  return {
    type: "GET_LIST_CAMPAIGN_REQUEST",
    payload: query
  }
}

export function getListProfilebyCampaign(id, query) {
  return {
    type: "GET_LIST_PROFILE_BY_CAMPAIGN_REQUEST",
    payload: {
      id,
      query,
    }
  }
}

export function updateCampaignListAction(params) {
  return {
    type: "UPDATE_CAMPAIGN_LIST_REQUEST",
    payload: params
  }
}

export function getCampaignDetailAction(params) {
  return {
    type: "GET_CAMPAIGN_DETAIL_REQUEST",
    payload: params,
  };
}