import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPanicRequest from "./components/AddPanicRequest";
import PanicRequest from "./components/PanicRequest";
import PanicRequestList from "./components/PanicRequestList";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/panic_requests" className="navbar-brand">
            Panic Requests
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Panic Requests
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/panic_requests"]} component={PanicRequestList} />
            <Route exact path="/add" component={AddPanicRequest} />
            <Route path="/panic_requests/:id" component={PanicRequest} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;