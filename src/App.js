import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// import PanicRequest from "./components/PanicRequest";
import PanicRequestList from "./components/PanicRequestList";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/panic_requests" className="navbar-brand">
            Panic Requests
          </a>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/panic_requests"]} component={PanicRequestList} />
            {/* <Route path="/request/:id" component={PanicRequest} /> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;