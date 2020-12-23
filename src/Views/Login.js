import React, { useState } from "react"
import { useHistory } from 'react-router-dom'
import axios from "axios"
const port = "http://localhost:3000"

function Login() {
  const history = useHistory()

  const [ email, setEmail ] = useState("")
  const [ password, setPassdword ] = useState("")
  const [ error, setError ] = useState("")
  const [ isError, setIsError ] = useState(false)


  function handleSubmit(e) {
    e.preventDefault()
    if (email && password) {
      axios.post(`${ port }/login`, {
        data: {
          email: email,
          password: password
        }
      })
        .then(res => {
          const token = res.data.access_token
          localStorage.setItem('access_token', token)
          history.push("/dashboard")
        })
        .catch(err => {
          setIsError(true)
          setError(err.response.data.message)
          console.log(err.response.data.message)
        })
    } else {
      setIsError(true)
      setError("*email dan password harus diisi !")
    }
  }

  return (
    <div className="container login">
      <h1>Login</h1>
      <form onSubmit={ handleSubmit }>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={ (e) => setEmail(e.target.value) } value={ email } />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" onChange={ (e) => setPassdword(e.target.value) } value={ password } />
        </div>
        <button type="submit" className="btn">Submit</button>
      </form>
      {
        isError && <p style={ { color: "red" } }>{ error }</p>
      }
    </div>

  )
}


export default Login;