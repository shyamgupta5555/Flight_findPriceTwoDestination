import React, { useState, useEffect } from "react";
import "./main.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Main() {
  const [source, setSource] = useState();
  const [destination, setDestination] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData("")
    setError("");
    
    if(!destination)return setError("Please enter destination .");
    if(!source)return setError("Please enter  source.");
    console.log(destination ,source)
    if(destination == source)return setError("Please enter different location ");
    if (!destination.trim() || !source.trim()) {
      setError("Please enter both destination and source.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/flightPrice?source=${source}&destination=${destination}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(response.data);
      console.log("Login success:", response.data);
      setSource("")
       setDestination("")
      localStorage.setItem("token", response.data.token);
      navigate("/");
      
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="div">
      <div className="banner"></div>
      <div className="mainContent">
        <div className="source">
          <input
            placeholder="first location"
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
            }}
          />
        </div>
        <div className="destination">
          <input
            placeholder="destination"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
            }}
          />
        </div>
        <div className="button">
          <button onClick={handleSubmit}>Search</button>
        </div>
      </div>
      <div className="cards">
        <div className="cards">
          {data ? (
            <>
              <div className="indigo">
                <h3>Indigo</h3>
                <h4>{data.indigo}</h4>
              </div>
              <div className="airAsia">
                <h3>AirAsia</h3>
                <h4>{data.airAsia}</h4>
              </div>
              <div className="vistara">
                <h3>Vistara</h3>
                <h4>{data.vistara}</h4>
              </div>
            </>
          ) : (
            <p style={{color:"red" ,fontSize:"3rem" ,textTransform :"uppercase"}}>{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
