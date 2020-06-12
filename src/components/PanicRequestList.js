import React, { useState, useEffect } from "react";
import PanicRequestDataService from "../services/PanicRequestService";
// import { Link } from "react-router-dom";
const moment= require('moment') 

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
        for(let i = 0; i < response.data.length; i++)
        { 
           response.data[i].friendlyDate = moment(response.data[i].createdAt).format('MMMM Do YYYY, h:mm:ss a');
        }
        setPanicRequests(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

 /* const refreshList = () => {
    retrievePanicRequests();
    setCurrentPanicRequest(null);
    setCurrentIndex(-1);
  };*/

  const setActivePanicRequest = (panicRequest, index) => {
    setCurrentPanicRequest(panicRequest);
    setCurrentIndex(index);
  };

  const findByName = (searchName) => {
    PanicRequestDataService.searchbyname(searchName)
      .then(response => {
        if(response === null || response === undefined || response.data === null || response.data === undefined )
        {
            setPanicRequests([]);
            return Promise.resolve([]);
        }
        setPanicRequests(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div id="searchbox" className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={ searchName.length === 0 ? function(){} : onChangeSearchName()}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={ searchName.length === 0 ? function(){} : findByName(searchName)}
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
                <span class="name">Requester: {JSON.parse(panicRequest.requester).short_name}</span>
                <span class="geocoords">{panicRequest.geolat.toString().substring(0, panicRequest.geolat.toString().indexOf(".") + 4)}, {panicRequest.geolong.toString().substring(0, panicRequest.geolong.toString().indexOf(".") + 4)}</span>
                <span class="date">{panicRequest.friendlyDate}</span>
                {/* <span>{moment(panicRequest.createdAt).format('YYYY-MM-DD HH:mm:ss') }</span> */}
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
                <strong>Name:</strong>
              </label>{" "}
              { JSON.parse(currentRequest.requester).full_name }
            </div>
            <div>
              <label>
                <strong>GeoCoords:</strong>
              </label>{" "}
              {currentRequest.geolat}, {currentRequest.geolong}
            </div>
            <div>
              <label>
                <strong>Date Created:</strong>
              </label>{" "}
              {currentRequest.friendlyDate}
            </div>
            {/* <Link
              to={"/panic_request/" + currentRequest.id}
              className="badge badge-warning"
            >
              Edit
            </Link> */}
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