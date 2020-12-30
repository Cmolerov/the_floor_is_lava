import React, { useEffect, useState, Component } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

import * as routesAction from '../store/routes'


const containerStyle = {
  width: '200px',
  height: '200px'
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
  const [response, setResponse] = useState(null)
  let travelMode = 'WALKING'
  let origin = '42.35796768090105,-71.07336678423798'
  let destination = '42.369803176648205,-71.06982626829688'
  
  function directionsCallback (response) {
    console.log(response)
  
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response)
      } else {
        console.log('response: ', response)
      }
    }
  }
  
  //END MAP
  
  useEffect(() => {
    dispatch(routesAction.routesSearch(id))
      .then(() => setIsLoaded(true))
  }, [dispatch])

  return isLoaded &&(
    <>
      <div>
        {
          Object.values(routes).map((route, idx) => {
            // origin = `${route.startLat},${route.startLong}`
            // destination = `${route.endLat},${route.startLong}`
            return (
              <div key={idx} className='results-container__body__local'>
                <NavLink className='navlinks' to={`/routes/${route.id}`}>
                  <div className='results-local-header'>
                    <div className='map'>
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
        }
    </div>
      <LoadScript
        googleMapsApiKey={apiKey}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          {
              (
                destination !== '' &&
                origin !== ''
              ) && (
                <DirectionsService
                  // required
                  options={{ 
                    destination: destination,
                    origin: origin,
                    travelMode: travelMode
                  }}
                  // required
                  callback={directionsCallback}
                  // optional
                  onLoad={directionsService => {
                    console.log('DirectionsService onLoad directionsService: ', directionsService)
                  }}
                />
              )
            }

            {
              response !== null && (
                <DirectionsRenderer
                  // required
                  options={{
                    directions: response
                  }}
                  // optional
                  onLoad={directionsRenderer => {
                    console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                  }}
                />
              )
            }
        </GoogleMap>
      </LoadScript>
      </>
  )
}

export default Routes;