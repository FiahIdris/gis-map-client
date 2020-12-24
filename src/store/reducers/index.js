const initialState = {
  newData: {
    name: "",
    city: "",
    province: "",
    latitude: -0.789275,
    longitude: 113.921327
  },
  allData: null,
  dataEdit: {
    name: "",
    city: "",
    province: "",
    latitude: -0.789275,
    longitude: 113.921327
  },
  dataAdd: {
    name: "",
    city: "",
    province: "",
    latitude: -0.789275,
    longitude: 113.921327
  },
  displayForms: "",
  whatAction: null,
  errors: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_NEW_DATA":
      return {
        ...state, newData: action.payload
      }
    case "FETCH_DATA":
      return {
        ...state, allData: action.payload
      }
    case "SAVE_DATA_EDIT":
      return {
        ...state, dataEdit: action.payload
      }
    case "SAVE_DATA_ADD":
      return {
        ...state, dataAdd: action.payload
      }
    case "SAVE_DISPLAY_FORM":
      return {
        ...state, displayForms: action.payload
      }
    case "SAVE_ACTION":
      return {
        ...state, whatAction: action.payload
      }
    case "SET_ERRORS":
      return {
        ...state, errors: action.payload
      }

    default:
      return state;
  }
}

export default reducer;