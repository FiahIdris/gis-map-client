import { ADD_ZOOM_DATA, FETCH_DATA, SAVE_DATA_EDIT, SAVE_DATA_ADD, SAVE_DISPLAY_FORM, SAVE_ACTION, SET_ERRORS, SHOW_ZOOM } from "./type"
import axios from "axios"
const port = "https://gismap-server.herokuapp.com"

export const addZoomData = function (data) {
  return {
    type: ADD_ZOOM_DATA, payload: data
  }
}

export const fetchData = function (data) {
  return {
    type: FETCH_DATA, payload: data
  }
}

export const setErrors = function (data) {
  return {
    type: SET_ERRORS, payload: data
  }
}

export const saveDataEdit = function (data) {
  return {
    type: SAVE_DATA_EDIT, payload: data
  }
}

export const saveDataAdd = function (data) {
  return {
    type: SAVE_DATA_ADD, payload: data
  }
}

export const displayForm = function (data) {
  return {
    type: SAVE_DISPLAY_FORM, payload: data
  }
}

export const saveAction = function (data) {
  return {
    type: SAVE_ACTION, payload: data
  }
}

export const showZoom = function (data) {
  return {
    type: SHOW_ZOOM, payload: data
  }
}

export const fetchDataServer = function () {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${ port }/locations`, {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })


      await dispatch(fetchData(data.locations))
    } catch (err) {
      // await dispatch(handleError(true))
    }
  }
}







