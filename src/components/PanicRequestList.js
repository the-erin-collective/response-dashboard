import React, { useState, useEffect } from "react";
import PanicRequestDataService from "../services/PanicRequestService";
import { Link } from "react-router-dom";

const PanicRequestList = () => {
  const [panicRequests, setPanicRequests] = useState([]);
  const [currentRequest, setCurrentPanicRequest] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrievePanicRequests();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrievePanicRequests = () => {
    PanicRequestDataService.findAll()
      .then(response => {
        setPanicRequests(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievePanicRequests();
    setCurrentPanicRequest(null);
    setCurrentIndex(-1);
  };

  const setActivePanicRequest = (panicRequest, index) => {
    setCurrentPanicRequest(panicRequest);
    setCurrentIndex(index);
  };

  const findByName = (searchName) => {
    PanicRequestDataService.findByName(searchName)
      .then(response => {
        setPanicRequests(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Panic Request List</h4>

        <ul className="list-group">
          {panicRequests &&
            panicRequests.map((panicRequest, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePanicRequest(panicRequest, index)}
                key={index}
              >
                {panicRequest.geolat}, {panicRequest.geolong}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentRequest ? (
          <div>
            <h4>Panic Request</h4>
            <div>
              <label>
                <strong>Geolat:</strong>
              </label>{" "}
              {currentRequest.geolat}
            </div>
            <div>
              <label>
                <strong>Geolong:</strong>
              </label>{" "}
              {currentRequest.geolong}
            </div>
         
            <Link
              to={"/panic_request/" + currentRequest.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Panic Request...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanicRequestList;