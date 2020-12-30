import React, { useEffect, useState, Component } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import * as routesAction from '../store/routes'


const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function Routes(props) {
  const id = props.user.id;
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const routes = useSelector(state => state.routes.routes);
  const apiKey = useSelector(state => state.routes.apiKey)
  console.log("THIS IS API KEY!!!!", apiKey)
  
  useEffect(() => {
    dispatch(routesAction.routesSearch(id))
      .then(() => console.log("THE STORE IS UP AND RUNNING"))
      .then(() => setIsLoaded(true))
  }, [dispatch])
  let userRoutes;

  if (routes) {
    userRoutes =
      Object.values(routes).map((route, idx) => {
      return (
        <div key={idx} className='results-container__body__local'>
            <NavLink className='navlinks' to={`/routes/${route.id}`}>
            <div className='results-local-header'>
              <div className='testCSS'>
              {/* <img className='results-local-header__image' src={`https://maps.googleapis.com/maps/api/directions/json?
origin=${route.startLat},${route.startLong}&destination=${route.endLat},${route.endLong}
&key=${apiKey}`} /> */}
              </div>
              <h1 className='results-local-username'>{route.name}</h1>
              </div>
            </NavLink>
            <div className='results-local-user__bio'><p>{route.description}</p></div>
        </div>
      )
    })
  } else {
    userRoutes = <div className='no-results-found'> No Results Found </div>
  }

  return isLoaded && (
    <>
    <div>
      {userRoutes}
    </div>
      <LoadScript
        googleMapsApiKey={apiKey}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
      </>
  )
}

export default Routes;