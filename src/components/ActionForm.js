import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { addNewData } from '../store/actions'
import { fetchDataServer, displayForm } from '../store/actions'
const port = "http://localhost:3000"

function ActionForm({ show, actionData }) {
  const dispatch = useDispatch()
  const { dataEdit, displayForms, whatAction } = useSelector(state => state)

  const [ label, setLabel ] = useState(dataEdit.name)
  const [ city, setCity ] = useState(dataEdit.city)
  const [ province, setProvince ] = useState(dataEdit.province)
  const [ latitude, setLatitude ] = useState(dataEdit.latitude)
  const [ longitude, setLongitude ] = useState(dataEdit.longitude)
  const [ error, setError ] = useState()
  // const [ isError, setIsError ] = useState(false)
  // const history = useHistory()
  const [ action, setAction ] = useState(actionData)

  function handleSubmit(event) {
    event.preventDefault()


    const data = {
      name: label, city, province, latitude, longitude
    }

    if (action === "add") {
      axios.post(`${ port }/locations`, {
        data,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(res => {
          dispatch(addNewData(data))
          dispatch(fetchDataServer())
          dispatch(displayForm('none'))

        })
        .catch(err => {
          console.log(err)
          // setError(err.response.data.message)

        })
    } else if (action === "edit") {
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
          dispatch(displayForm('none'))
        })
        .catch(err => {
          console.log(err)
          // setIsError(true)
          // setError(err.response.data.message)
        })
    }



  }

  return (
    <form className="add-form" style={ { display: displayForms } } onSubmit={ handleSubmit }>
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
      {
        whatAction === "add" && <button type="submit">Add</button>
      }
      {
        whatAction === "edit" && <button type="submit">Edit</button>
      }

      {
        error && error.map((e) => (
          <p style={ { color: 'red', marginBottom: '5px' } }>*{ e }</p>
        ))
      }
    </form>
  )
}

export default ActionForm;