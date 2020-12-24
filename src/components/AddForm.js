import React, { useEffect, useState } from "react"
import MyMap from "./MyMap"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataServer, setErrors } from "../store/actions"
import { useHistory } from 'react-router-dom'
const port = "http://localhost:3000"




function AddForm() {

  const { dataAdd } = useSelector(state => state)
  const dispatch = useDispatch()
  const history = useHistory()



  const [ label, setLabel ] = useState(dataAdd.name)
  const [ city, setCity ] = useState(dataAdd.city)
  const [ province, setProvince ] = useState(dataAdd.province)
  const [ latitude, setLatitude ] = useState(dataAdd.latitude)
  const [ longitude, setLongitude ] = useState(dataAdd.longitude)
  const [ error, setError ] = useState()


  useEffect(() => {
    dispatch(fetchDataServer())
    setLatitude(dataAdd.latitude)
    setLongitude(dataAdd.longitude)
  }, [ dataAdd.latitude, dataAdd.longitude, dispatch ])


  function handleSubmit(event) {
    event.preventDefault()
    const data = {
      name: label, city, province, latitude, longitude
    }

    if (data) {
      axios.post(`${ port }/locations`, {
        data,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(res => {
          // dispatch(addNewData(data))
          dispatch(fetchDataServer())
          history.push("/dashboard")

        })
        .catch(err => {
          // console.log(err)
          dispatch(setErrors(err.response.data.message))
          setError(err.response.data.message)

        })
    }

  }


  function handleCancel() {
    history.push("/dashboard")
  }

  return (
    <div className="container container-top">
      <MyMap />
      <form className="add-form" onSubmit={ handleSubmit }>
        <div className="form-group">
          <label>Label</label>
          <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Label" onChange={ (e) => setLabel(e.target.value) } value={ label } />
        </div>
        <div className="form-group">
          <label>Kota/Kabupaten</label>
          <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Kota/Kabupaten" onChange={ (e) => setCity(e.target.value) } value={ city } />
        </div>
        <div className="form-group">
          <label>Profinsi</label>
          <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Profinsi" onChange={ (e) => setProvince(e.target.value) } value={ province } />
        </div>
        <div className="form-group">
          <label>Latitude</label>
          <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Latitude" onChange={ (e) => setLatitude(e.target.value) } value={ latitude } />
        </div>
        <div className="form-group">
          <label>Longitude</label>
          <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Longitude" onChange={ (e) => setLongitude(e.target.value) } value={ longitude } />
        </div>
        <button type="submit">Add</button>
        <button type="submit" onClick={ () => handleCancel() } style={ { marginLeft: "20px" } }>Cancel</button>

        {
          error &&
          <p style={ { color: 'red', marginBottom: '5px' } }>*{ error }, </p>
        }
      </form>
    </div>
  )
}

export default AddForm;