const initialState = {
  campaignList: {
    data: [],
    load: false,
  },
  profileListByCampaign: {
    data: [],
  },
  error: '',
  campaignDetail: {
    data: {},
    load: false,
    error: "",
  }
}

export default function campaignReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_CAMPAIGN_REQUEST': {
      return {
        ...state,
        campaignList: {
          ...state.campaignList,
          load: true
        }
      };
    }
    case 'ADD_CAMPAIGN_SUCCESS': {
      const { data } = action.payload; 
      return {
        ...state,
        campaignList: {
          ...state.campaignList,
          load: false,
          data: data,
        }
      };
    }
    case 'ADD_CAMPAIGN_FAIL': {
      return {
        ...state,
        campaignList: {
          ...state.campaignList,
          load: false
        }
      };
    }

    case 'GET_LIST_SUCCESS': {
      return {
        ...state,
        campaignList: {
          ...state.campaignList,
          data: action.payload
        },
        error: ''
      };
    }
    case 'GET_LIST_FAIL': {
      return {
        ...state,
        error: action.payload
      };
    }

    case 'GET_LIST_PROFILE_SUCCESS': {
      return {
        ...state,
        profileListByCampaign: {
          ...state.profileListByCampaign,
          data: action.payload,
        },
        error: '',
      };
    }
    case 'GET_LIST_PROFILE_FAIL': {
      return {
        ...state,
        error: action.payload
      };
    }

    case 'UPDATE_CAMPAIGN_LIST_REQUEST': {
      return {
        ...state,
        campaignList: {
          ...state.campaignList,
          load: true,
        }
      }
    }
    case 'UPDATE_CAMPAIGN_SUCCESS': {
      const { data, id } = action.payload;
      const newCampaignList = state.campaignList.data
      const campaignIndex = newCampaignList.findIndex((item) => { return item.id === id })
      newCampaignList.splice(campaignIndex, 1, data)
      return {
        ...state,
        campaignList: {
          ...state.campaignList,
          data: newCampaignList,
          load: false
        }
      }
    }
    case 'UPDATE_CAMPAIGN_FAIL': {
      const { error } = action.payload
      return {
        ...state,
        campaignList: {
          ...state.campaignList,
          error: error,
          load: false
        }
      }
    }

    case "GET_CAMPAIGN_DETAIL_REQUEST": {
      return {
        ...state,
        campaignDetail: {
          ...state.campaignDetail,
          load: true,
        },
      };
    }
    case "GET_CAMPAIGN_DETAIL_SUCCESS": {
      const { data } = action.payload;
      return {
        ...state,
        campaignDetail: {
          ...state.campaignDetail,
          data: data,
          load: false,
        },
      };
    }
    case "GET_CAMPAIGN_DETAIL_FAIL": {
      const { error } = action.payload;
      return {
        ...state,
        campaignDetail: {
          ...state.campaignDetail,
          load: false,
          error: error,
        },
      };
    }

    default: {
      return state;
    }
  }
}