import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { Link, useHistory } from 'react-router-dom'
import EditForm from '../components/EditForm'
import MyMap from "../components/MyMap"
import { fetchDataServer, saveDataEdit, saveAction, fetchData, setErrors, showZoom, addZoomData } from '../store/actions'
const port = "https://gismap-server.herokuapp.com"

function Dashboard() {
  const history = useHistory()
  const { allData, whatAction, isShowZoom, zoomData } = useSelector(state => state)

  const [ selectedValue, setSelectedValue ] = useState("Filter")
  const dispatch = useDispatch()

  const [ search, setSearch ] = useState()
  const [ notFound, setNotFound ] = useState()
  const [ dataFilter, setDataFilter ] = useState([])
  const [ isSearch, setIsSearch ] = useState(false)

  useEffect(() => {
    dispatch(fetchDataServer())
    if (!search) {
      setNotFound(false)
    }
  }, [ search, dispatch ])
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
    dispatch(addZoomData(data))
    dispatch(showZoom(true))
    dispatch(setErrors(null))
  }

  function handleSearch(e) {
    e.preventDefault()
    setIsSearch(true)

    let result = allData.filter(item => item.name.toUpperCase() === search.toUpperCase());
    if (result.length > 1 || result.length === 1) {
      setDataFilter(result)
      setNotFound(false)
    } else {
      setNotFound(true)
      setSearch("")
      dispatch(fetchDataServer())
      setIsSearch(false)
    }

  }

  function handleShow(data) {
    // console.log(data)
    dispatch(addZoomData(data))
    dispatch(showZoom(true))
    // console.log("rendering on dash", isShow)
  }

  function logOut() {
    localStorage.clear()
    history.push("/login")
  }

  return (
    <div className="container-fluid dashboard">
      {
        whatAction !== "edit" && <Link to="/add">
          <button style={ { margin: "20px 60px" } }>Add Location</button>
        </Link>
      }

      <button style={ { marginTop: "20px", marginLeft: "900px" } } onClick={ logOut }>Log Out</button>

      <div className="container container-top">
        <MyMap
          dataPoints={ allData }
          showData={ zoomData }
          isShow={ isShowZoom }
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
          notFound && <p style={ { color: "blue" } }>...Tidak ditemukan...</p>
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
            { isSearch && dataFilter &&
              dataFilter.map((location) => (
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


                    <i className="fa fa-trash-o fa-2x" aria-hidden="true" onClick={ () => handleDelete(location.id) } />

                    <i className="fa fa-eye fa-2x" aria-hidden="true" onClick={ () => handleShow(location) } style={ { marginLeft: "10px" } } />
                  </td>
                </tr>
              ))
            }
            {
              !isSearch && allData &&
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


                    <i className="fa fa-trash-o fa-2x" aria-hidden="true" onClick={ () => handleDelete(location.id) } />

                    <i className="fa fa-eye fa-2x" aria-hidden="true" onClick={ () => handleShow(location) } style={ { marginLeft: "10px" } } />

                  </td>
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