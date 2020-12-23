import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useHistory, Link } from 'react-router-dom'
import ActionForm from '../components/ActionForm'
import MyMap from "../components/MyMap"
import { fetchDataServer, saveDataEdit, displayForm, saveAction, fetchData } from '../store/actions'
const port = "http://localhost:3000"


function Dashboard() {
  const [ selectedValue, setSelectedValue ] = useState("Descending")
  const dispatch = useDispatch()
  const [ error, setError ] = useState("")
  const [ isError, setIsError ] = useState(false)
  const [ search, setSearch ] = useState()
  const [ notFound, setNotFound ] = useState()

  const { newData, allData, whatAction } = useSelector(state => state)

  // console.log(allData)

  useEffect(() => {
    dispatch(fetchDataServer())

  }, [])

  function handleDelete(dataId) {
    axios.delete(`${ port }/locations/${ dataId }`, {
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .then(res => {
        dispatch(fetchDataServer())
        // console.log("yess")
        // history.push("/dashboard")
      })
      .catch(err => {
        console.log(err.response)
        setIsError(true)
        // setError(err.response.data.message)
      })
  }

  function handleChange(e) {
    e.preventDefault()
    // console.log(e.target.value)
    setSelectedValue(e.target.value)
    if (e.target.value === "Descending") {
      axios.get(`${ port }/locations/desc`, {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(res => {
          console.log(res.data.locations, "dscccc")
          dispatch(fetchData(res.data.locations))

        })
        .catch(err => {
          console.log(err)

          // setError(err.response.data.message)

        })
    } else {
      axios.get(`${ port }/locations/asc`, {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(res => {
          console.log(res, "asccccc")
          dispatch(fetchData(res.data.locations))
        })
        .catch(err => {
          console.log(err)
          // setError(err.response.data.message)

        })
    }
  }


  function handleEdit(data) {
    dispatch(saveDataEdit(data))
    dispatch(displayForm("block"))
    dispatch(saveAction("edit"))
  }

  function handleAddClick() {
    dispatch(displayForm("block"))
    dispatch(saveAction("add"))

  }

  function handleSearch(e) {

    e.preventDefault()
    let result = allData.filter(data => data.name === search);
    if (result.length > 1 || result.lenght === 1) {

      dispatch(fetchData(result))

    } else {
      setSearch("")
      dispatch(fetchDataServer())
      setNotFound(true)
    }



    // axios.get(`${ port }/locations/${ search }`, {
    //   headers: {
    //     access_token: localStorage.getItem("access_token")
    //   }
    // })
    //   .then(res => {
    //     if (res.status === 200) {
    //       let result = allData.filter(data => data.name === search);
    //       dispatch(fetchData(result))
    //     }
    //   })
    //   .catch(err => {
    //     setNotFound(true)
    //     console.log(err.response.data.message)
    //     // setIsError(true)
    //     setError(err.response.data.message)
    //   })

  }

  return (
    <div className="container-fluid dashboard">

      <div className="container container-top">
        {
          allData && <MyMap

            dataPoints={
              whatAction === "add" ? newData : allData
            }

            isAdd={
              whatAction === "add" ? true : false
            }

          />
        }

        {
          whatAction && <ActionForm
            actionData={ whatAction }
          />
        }

      </div>
      <button onClick={ handleAddClick }>Add Location</button>

      <div className="container table">

        <select id="filter"
          value={ selectedValue }
          onChange={ (e) => handleChange(e) }>
          <option value="">Filter</option>
          <option value="Descending">Descending</option>
          <option value="Ascending">Ascending</option>
        </select>
        <form onSubmit={ handleSearch }>
          <input type="text" placeholder="..Search by Label.." onChange={ (e) => setSearch(e.target.value) } />
          <button type="submit">ok</button>
        </form>
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
              allData &&
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
                    {/* <Link to={ { pathname: "/edit", data: location } } > */ }
                    <i style={ { marginRight: "10px" } } className="fa fa-pencil fa-2x" aria-hidden="true" onClick={ () => handleEdit(location) } />
                    {/* </Link> */ }
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