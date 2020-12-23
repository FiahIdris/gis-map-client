import React from "react"
import "./scss/index.css"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Login from "./Views/Login"
import Dashboard from "./Views/Dashboard"


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/dashboard" component={ Dashboard } />
          <Route path="/" component={ Login } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
