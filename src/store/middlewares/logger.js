//currying

const logger = store => dispatch => async action => {
  // console.log('Action yang akan dijalankan', action)
  dispatch(action)
  // console.log('Data yang didapatkan', store.getState())
}

export default logger