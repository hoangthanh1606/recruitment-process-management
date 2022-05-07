export function getCampaign(id) {
  return {
    type: "CANDIDATE_GET_CAMPAIGN",
    payload: {
      id,
    }
  }
}

export function getCandidateListCampaign(query) {
  return {
    type: "CANDIDATE_GET_LIST_CAMPAIGN",
    payload: query
  }
}

export function candidateApplyCampaign(data) {
  return {
    type: "CANDIDATE_APPLY_CAMPAIGN",
    payload: {
      data,
    }
  }
}
