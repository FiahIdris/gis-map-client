import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useHistory, Link } from 'react-router-dom'
import EditForm from '../components/EditForm'
import MyMap from "../components/MyMap"
import searchItem from "../components/SearchFunction"
import { fetchDataServer, saveDataEdit, displayForm, saveAction, fetchData, setErrors } from '../store/actions'
const port = "http://localhost:3000"




function Dashboard() {
  const dataEdit = useSelector(state => state.dataEdit)
  const { newData, allData, whatAction } = useSelector(state => state)

  const [ selectedValue, setSelectedValue ] = useState("Filter")
  const dispatch = useDispatch()
  const [ error, setError ] = useState("")
  const [ isError, setIsError ] = useState(false)
  const [ search, setSearch ] = useState()
  const [ notFound, setNotFound ] = useState()
  const [ data, setData ] = useState(allData)

  console.log(allData)

  useEffect(() => {
    dispatch(fetchDataServer())
    setData(allData)
  }, [])

  function handleDelete(dataId) {
    axios.delete(`${ port }/locations/${ dataId }`, {
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .then(res => {
        dispatch(fetchDataServer())

      })
      .catch(err => {
        // console.log(err.response)
        setIsError(true)
        // setError(err.response.data.message)
      })
  }

  function handleFilter(e) {
    e.preventDefault()
    setSelectedValue(e.target.value)

    if (e.target.value === "Descending") {
      const descendingData = allData.sort().reverse()

      dispatch(fetchData(descendingData))
    } else {
      dispatch(fetchDataServer())
    }
  }

  function handleEdit(data) {
    dispatch(saveDataEdit(data))
    dispatch(saveAction("edit"))
    dispatch(setErrors(null))
  }

  function handleSearch(e) {
    e.preventDefault()
    // dispatch(fetchDataServer())
    let result = data.filter(item => item.name.toUpperCase() === search.toUpperCase());
    if (result.length > 1 || result.length === 1) {
      // console.log(search, search.toUpperCase())
      setData(result)

    } else {
      setSearch("")
      dispatch(fetchDataServer())
      setNotFound(true)
    }

  }

  return (
    <div className="container-fluid dashboard">
      {
        whatAction !== "edit" && <Link to="/add">
          <button>Add Location</button>
        </Link>
      }

      <div className="container container-top">
        <MyMap
          dataPoints={ allData }
        />
        {
          whatAction === "edit" && <EditForm />
        }
      </div>
      <div className="container container-bottom">
        <div className="container filter">
          <select id="filter"
            value={ selectedValue }
            onChange={ (e) => handleFilter(e) }>
            <option value="">Filter </option>
            <option value="Descending">Descending</option>
            <option value="Ascending">Ascending</option>
          </select>
          <form onSubmit={ handleSearch }>
            <input type="text" placeholder="Search here" onChange={ (e) => setSearch(e.target.value) } />
            <button type="submit"><i className="fa fa-search"></i></button>
          </form>
        </div>

        {
          notFound && <p>...Tidak ditemukan...</p>
        }

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Label</th>
              <th scope="col">Kota/Kab</th>
              <th scope="col">Provinsi</th>
              <th scope="col">Latitude</th>
              <th scope="col">Longitude</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data ?
                data.map((location) => (
                  <tr
                    key={ location.id }
                  >
                    <td>{ location.name }</td>
                    <td>{ location.city }</td>
                    <td>{ location.province }</td>
                    <td>{ location.latitude }</td>
                    <td>{ location.longitude }</td>
                    <td>

                      {
                        whatAction !== "edit" && <i style={ { marginRight: "10px" } } className="fa fa-pencil fa-2x" aria-hidden="true" onClick={ () => handleEdit(location) } />
                      }


                      <i className="fa fa-trash-o fa-2x" aria-hidden="true" onClick={ () => handleDelete(location.id) } /></td>
                  </tr>
                )) :
                allData.map((location) => (
                  <tr
                    key={ location.id }
                  >
                    <td>{ location.name }</td>
                    <td>{ location.city }</td>
                    <td>{ location.province }</td>
                    <td>{ location.latitude }</td>
                    <td>{ location.longitude }</td>
                    <td>

                      {
                        whatAction !== "edit" && <i style={ { marginRight: "10px" } } className="fa fa-pencil fa-2x" aria-hidden="true" onClick={ () => handleEdit(location) } />
                      }


                      <i className="fa fa-trash-o fa-2x" aria-hidden="true" onClick={ () => handleDelete(location.id) } /></td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard;