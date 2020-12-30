import React, { useEffect, useState, Component } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

import * as routesAction from '../store/routes'


function SingleRoute() {
  
  // const route = useSelector(state => state.routes.route);
  const origin = useSelector(state => `${state.routes.route.startLat},${state.routes.route.startLong}`);
  const destination = useSelector(state => `${state.routes.route.endLat},${state.routes.route.endLong}`)
  const apiKey = useSelector(state => state.routes.apiKey)
  const { routeId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [response, setResponse] = useState(null);
  // const [origin, setOrigin] = useState("");
  // const [destination, setDestination] = useState("");
  
 

  let travelMode = 'WALKING'

  const containerStyle = {
    width: '800px',
    height: '400px'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };
  
  function directionsCallback(response) {
    // console.log(response)
  
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response)
      } else {
        console.log('response: ', response)
      }
    }
  }
  
  useEffect(() => {
    dispatch(routesAction.routeSearch(routeId))
      // .then(() => setOrigin(`${route.startLat},${route.startLong}`))
      // .then(() => setDestination(`${route.endLat},${route.endLong}`))
      .then(() => setIsLoaded(true))
  }, [dispatch])
  // let destination;
  // let origin;


  return isLoaded &&(
    <div>
    {/* { origin = `${route.startLat}, ${route.startLong}`}
    { destination = `${route.endLat }, ${ route.endLong }` } */}
    {/* {console.log('return route', route.startLat)} */}
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
    </div>
  )
  // return isLoadedMap ? renderMap() : null;
}

export default SingleRoute;