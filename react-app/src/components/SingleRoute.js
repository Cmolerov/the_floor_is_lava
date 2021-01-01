import React, { useEffect, useState, Component } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, useLoadScript, } from '@react-google-maps/api';
import './SingleRoute.css'
import * as routesAction from '../store/routes';


function SingleRoute() {
  
  const route = useSelector(state => state.routes.route);
  const origin = useSelector(state => `${state.routes.route.startLat},${state.routes.route.startLong}`);
  const destination = useSelector(state => `${state.routes.route.endLat},${state.routes.route.endLong}`)
  const apiKey = useSelector(state => state.routes.apiKey)
  const center = useSelector( state =>
  {
    return {
      lat: state.routes.route.startLat,
      lng: state.routes.route.startLong,
    }
  })
  const { routeId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded2, setIsLoaded2] = useState(false);
  const [response, setResponse] = useState(null);
  // const [origin, setOrigin] = useState("");
  // const [destination, setDestination] = useState("");
  
 

  let travelMode = 'WALKING'

  const containerStyle = {
    width: '600px',
    height: '400px'
  };
  
  // const center = {
  //   lat: -3.745,
  //   lng: -38.523
  // };
  
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
      .then(() => setIsLoaded2(true))
  }, [dispatch])
  // let destination;
  // let origin;

    return(
      <div className="main__div__map-container">
        <p className="route__p__name">{ route.name }</p>
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
}

export default SingleRoute;