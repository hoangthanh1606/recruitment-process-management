const initialState = {
  error: '',
  campaign: {},
  campaignList: {
    data: [],
  },
  profile: {},
}

export default function candidateReducer(state = initialState, action) {
  switch (action.type) {
    case 'CANDIDATE_GET_CAMPAIGN_SUCCESS': {
      return {
        ...state,
        error: '',
        campaign: action.payload
      }
    }

    case 'CANDIDATE_GET_LIST_SUCCESS': {
      return {
        ...state,
        campaignList: {
          ...state.campaignList,
          data: action.payload
        },
        error: ''
      };
    }
    case 'CANDIDATE_LIST_FAIL': {
      return {
        ...state,
        error: action.payload
      };
    }

    case 'CANDIDATE_APPLY_CAMPAIGN_SUCCESS': {
      return {
        ...state,
        profile: action.payload,
        error: '',
      };
    }

    case 'CANDIDATE_APPLY_CAMPAIGN_FAIL': {
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
