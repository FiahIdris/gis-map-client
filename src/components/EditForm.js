import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { saveAction } from '../store/actions'
import { fetchDataServer, saveDataEdit, setErrors, showZoom } from '../store/actions'
import { useHistory } from 'react-router-dom'
const port = "https://gismap-server.herokuapp.com"

function EditForm() {
  const { dataEdit, errors } = useSelector(state => state)

  const dispatch = useDispatch()
  const history = useHistory()

  const [ label, setLabel ] = useState(dataEdit.name)
  const [ city, setCity ] = useState(dataEdit.city)
  const [ province, setProvince ] = useState(dataEdit.province)
  const [ latitude, setLatitude ] = useState(dataEdit.latitude)
  const [ longitude, setLongitude ] = useState(dataEdit.longitude)
  const [ show, setShow ] = useState()
  // const [ error, setError ] = useState()

  function handleSubmit(event) {
    event.preventDefault()


    const data = {
      name: label, city, province, latitude, longitude
    }
    if (data) {
      axios.put(`${ port }/locations/${ dataEdit.id }`, {
        data: {
          data
        },
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(res => {
          dispatch(fetchDataServer())
          dispatch(showZoom(false))
          setShow("none")
          dispatch(saveAction(null))
          dispatch(saveDataEdit({
            name: "",
            city: "",
            province: "",
            latitude: -0.789275,
            longitude: 113.921327
          }))
          history.push("/dashboard")

        })
        .catch(err => {
          // console.log(err)
          dispatch(setErrors(err.response.data.message))
          // setError(err.response.data.message)
        })
    }
  }


  function handleCancel() {
    dispatch(showZoom(false))
    dispatch(saveAction(""))
  }

  return (
    <form className="add-form" style={ { display: show } } onSubmit={ handleSubmit }>
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
      <button type="submit">Edit</button>
      <button type="submit" onClick={ () => handleCancel() } style={ { marginLeft: "20px" } }>Cancel</button>
      {
        errors &&
        <p style={ { color: 'red', marginBottom: '5px' } }>*{ errors }, </p>
      }
    </form>
  )
}

export default EditForm;