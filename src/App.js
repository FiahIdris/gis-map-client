import React from "react"
import "./scss/index.css"
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Login from "./Views/Login"
import Dashboard from "./Views/Dashboard"
import AddForm from "./components/AddForm"


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/add" component={ AddForm } />
          <Route path="/dashboard" component={ Dashboard } />
          <Route path="/" component={ Login } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
